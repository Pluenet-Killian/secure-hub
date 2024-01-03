import {IsEmail, IsNotEmpty} from "class-validator"

export class SignupDto {
    @IsNotEmpty()
    readonly username: string
    @IsEmail()
    @IsNotEmpty()
    readonly email: string
    @IsNotEmpty()
    readonly password: string
    @IsNotEmpty()
    readonly password_confirmation: string
}