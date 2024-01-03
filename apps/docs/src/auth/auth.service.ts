import { BadRequestException, ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from "bcrypt"
import * as speakeasy from "speakeasy"
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmation.dto';
import { VerifySignupDto } from './dto/verifySignup.dto';
@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService,
                private jwtService: JwtService,
                private configService: ConfigService,
                private mailerService: MailerService
                ) {}

    async signup(signupDto: SignupDto) {
        const {username, email, password, password_confirmation} = signupDto;
        let user = await this.prismaService.user.findUnique({where: {email}});
        if (user) throw new ConflictException("User already exists");
        if (password != password_confirmation) throw new BadRequestException("Passwords do not match.");
        const hash = await bcrypt.hash(password, 10);
        const secret = speakeasy.generateSecret({length: 20})
        const verificationToken = speakeasy.totp({
            secret: secret.base32,
            encoding: "base32"
        })
        await this.prismaService.user.create({data: {
            username, email, password: hash, isValided: false, totpSecret: secret.base32
        }})
        const verificationUrl = `http://localhost:3000/verify?email=${email}`
        await this.mailerService.sendValided(verificationUrl, email, verificationToken);
        user = await this.prismaService.user.findUnique({where: {email}});
        const payload = {sub: user.id, username: user.username, email: user.email};
        const token = this.jwtService.sign(payload, {
            expiresIn: '60m',
            secret: this.configService.get("JWT_SECRET")
        })
        return {access_token: token, data: "User created and verification email sen"};
    }

    async verify_signup(verifySignupDto: VerifySignupDto) {
        const {verifyCode, email} = verifySignupDto
        const user = await this.prismaService.user.findUnique({where: {email}});
        if (!user) throw new NotFoundException("User not found");
        if (!user.totpSecret) throw new UnauthorizedException("No authentication secret found");
    
        const match = speakeasy.totp.verify({
            secret: user.totpSecret,
            token: verifyCode,
            encoding: "base32",
            window: 2
        })
        if (!match) throw new UnauthorizedException("Authentification code invalid");
        await this.prismaService.user.update({where: {email}, data: {isValided: true}});
        return {data: "Double authentification validated !"};
    }

    async signin(signinDto: SignInDto) {
        const {email, password} = signinDto;
        const user = await this.prismaService.user.findUnique({where: {email}});
        if (!user) throw new NotFoundException("User not found");
        const decrypted_password = await bcrypt.compare(password, user.password);
        if (!decrypted_password) throw   new ForbiddenException("Incorrect identifier");
        const payload = {sub: user.id, username: user.username, email: user.email};
        const token = this.jwtService.sign(payload, {
            expiresIn: '60m',
            secret: this.configService.get("JWT_SECRET")
        })
        return {access_token: token, data: "User connected"};
    }

    async reset_password(resetPasswordDto: ResetPasswordDto) {
        const {email} = resetPasswordDto
        const user = this.prismaService.user.findUnique({where: {email}});
        if (!user) throw new NotFoundException("User not found");
        const code = speakeasy.totp({
            secret: this.configService.get("OTP_CODE"),
            digits: 5,
            step: 60 * 15,
            encoding: "base32"
        })
        const url = "http://localhost:3000/forgotten-confirmation";
        await this.mailerService.sendResetPassword(email, url, code);
        return {daeta: "Reset password mail has been sent"}
    }

    async reset_password_confirmation(resetPasswordConfirmationDto: ResetPasswordConfirmationDto) {
        const {email, code, password, password_confirmation} = resetPasswordConfirmationDto
        if (password != password_confirmation) throw new BadRequestException("Passwords do not match.")
        const user = this.prismaService.user.findUnique({where: {email}});
        if (!user) throw new NotFoundException("User not found");
        const match = speakeasy.totp.verify({
            secret: this.configService.get("OTP_CODE"),
            token: code,
            digits: 5,
            step: 60 * 15,
            encoding: "base32"
        })
        if (!match) throw new UnauthorizedException("Invalid/expired token");
        const hash = await bcrypt.hash(password, 10);
        await this.prismaService.user.update({where: {email}, data: {password: hash}})
        return {data: "Password updated"};
    }
}
