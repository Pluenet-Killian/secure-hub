import { IsNotEmpty } from "class-validator";

export class ResetPasswordConfirmationDto {
    @IsNotEmpty()
    readonly code: string;
    @IsNotEmpty()
    readonly email: string
    @IsNotEmpty()
    readonly password: string;
    @IsNotEmpty()
    readonly password_confirmation: string;
}