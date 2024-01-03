import { IsNotEmpty } from "class-validator";

export class VerifySignupDto {
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly verifyCode: string;
    
}