"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useSendDoubleAuthentification } from '../../../services/auth/auth';
import { FormEventHandler, useState } from "react";
import { userData } from "../../../components/auth/login/right-side/Right_side";
import { InputLabel } from "../InputLabel";
import { ButtonLink } from "../../../components/auth/forgotten/ButtonLink";
import { MandatoryFields } from "../../../components/MandatoryFields";

export const Verify = () => {
    const router = useRouter();
    const mutation = useSendDoubleAuthentification()
    if (mutation.isSuccess)
        router.push("/signin")
    const searchParams = useSearchParams()
    const email = searchParams.get("email")
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        const formData = new FormData(target);
        const currentData: userData = {
            verifyCode: formData.get("verifyCode") as string,
            email: email as string,
        }
        console.log(currentData.verifyCode);
        console.log(currentData.email);
        return mutation.mutate(currentData);
    }
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[75%] md:w-[50%] mb-24">
                <h1 className="md:text-4xl text-lg font-bold">Activer la double authentification</h1>
                <p className="mt-6">Veuillez entrer le code reçu pas e-mail pour activer la double authentification.</p>
                <div className="mt-6"></div>
                <form action="" onSubmit={handleSubmit}>
                <InputLabel
                    label={"Code"}
                    name={"verifyCode"}
                    type={"string"}
                    placeholder={"Entrez le code reçu par e-mail"}
                />
                <ButtonLink label={"Vérifier mon e-mail"}/>
                </form>
            </div>
        </div>
    )
}