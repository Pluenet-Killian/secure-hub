import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmation.dto';
import { VerifySignupDto } from './dto/verifySignup.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("Authentification")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto)
    }

    @Post("verify")
    verify_signup(@Body() verifySignupDto: VerifySignupDto) {
        return this.authService.verify_signup(verifySignupDto);
    }

    @Post("signin")
    signin(@Body() signinDto: SignInDto) {
        return this.authService.signin(signinDto)
    }

    @Post("reset-password")
    reset_password(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.reset_password(resetPasswordDto);
    }

    @Post("reset-password-confirmation")
    reset_passwordConfirmation(@Body() resetPasswordConfirmationDto: ResetPasswordConfirmationDto) {
        return this.authService.reset_password_confirmation(resetPasswordConfirmationDto);
    }
}
