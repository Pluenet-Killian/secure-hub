"use client"

import { useRouter } from "next/navigation";
import { useSendResetPassword, useSendResetPasswordConfirmation } from "../../../services/auth/auth";
import { FormEventHandler, useState } from "react";
import { userData } from "../../../components/auth/login/right-side/Right_side";
import { InputLabel } from "../InputLabel";
import { ButtonLink } from "../../../components/auth/forgotten/ButtonLink";

export const ForgottenConfirmation = () => {
    const [goodPass, setGoodpass] = useState(true)
    const [isAllEmpty, setIsAllEmpty] = useState(false);
    const router = useRouter();
    const mutation = useSendResetPasswordConfirmation()
    if (mutation.isSuccess)
        router.push("/signin")
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        const formData = new FormData(target);
        const currentData: userData = {
            email: formData.get("email") as string,
            code: formData.get("code") as string,
            password: formData.get("password") as string,
            password_confirmation: formData.get("password_confirmation") as string
        }
        if (currentData.email == "") {
            setIsAllEmpty(true);
            return;
          } else {
            setIsAllEmpty(false);
          }
        if (currentData.password != currentData.password_confirmation)
            setGoodpass(false);
        return mutation.mutate(currentData);
    }
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[75%] md:w-[50%] mb-24">
                <h1 className="md:text-4xl text-lg font-bold">Réinitialiser du Mot de passe</h1>
                <p className="mt-6">Veuillez inscrire un nouveau mot de passe pour votre compte.</p>
                <div className="mt-6"></div>
                <form action="" onSubmit={handleSubmit}>
                <InputLabel
                    label={"E-mail"}
                    name={"email"}
                    type={"email"}
                    placeholder={"Entrez votre e-mail"}
                />
                <div className="mt-6"></div>
                <InputLabel
                    label={"Code"}
                    name={"code"}
                    type={"string"}
                    placeholder={"Entrez le code reçu par e-mail"}
                />
                <div className="mt-6"></div>
                <InputLabel
                    label={"Nouveau mot de passe"}
                    name={"password"}
                    type={"password"}
                    placeholder={"Entrez votre mot de passe"}
                />
                <div className="mt-6"></div>
                <InputLabel
                    goodPass={goodPass}
                    label={"Confirmation mot de passe"}
                    name={"password_confirmation"}
                    type={"password"}
                    placeholder={"Répétez le mot de passe"}
                />
                    <ButtonLink label={"Réinitialiser mon mot de passe"}/>
                </form>
            </div>
        </div>
    )
}