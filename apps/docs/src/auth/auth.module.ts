import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';

@Module({
    imports: [JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: {expiresIn: '60m'}
    })],
    providers: [PrismaService, AuthService, JwtService],
    exports: [AuthService],
})
export class AuthModule {}
