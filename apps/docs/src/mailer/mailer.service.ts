import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer"

@Injectable()
export class MailerService {
    private async transporter() {
        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            service: "gmail",
            auth: {
                user: "killian.pluenet@gmail.com",
                pass: "iesj jgrj xsxn puug"
            }
        })
        return transport;
    }

    async sendValided(verificationUrl: string, userEmail: string, verificationToken: string) {
        (await this.transporter()).sendMail({
            from: "secured-hub@localhost.com",
            to: userEmail,
            subject: "Please confirm your account",
            html: `
                <p>Secret code <strong>${verificationToken}</strong></p>
                Please click here to confirm your account: <a href="${verificationUrl}">${verificationUrl}</a>`
        })
    }

    async sendResetPassword(userEmail: string, url: string, code: string) {
        (await this.transporter()).sendMail({
            from: "secured-hub@localhost.com",
            to: userEmail,
            subject: "Reset password",
            html: `
                <a href="${url}">Reset password</a>
                <p>Secret code <strong>${code}</strong></p>
                <p>Code will expire in 15 minutes</p>
            `
        })
    }
}
