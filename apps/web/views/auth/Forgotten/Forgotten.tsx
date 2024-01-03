"use client"

import { InputLabel } from "../InputLabel"
import { ButtonLink } from '../../../components/auth/forgotten/ButtonLink';
import { useSendResetPassword } from "../../../services/auth/auth";
import { FormEventHandler, useState } from "react";
import { userData } from "../../../components/auth/login/right-side/Right_side";
import { useRouter } from "next/navigation";
import { MandatoryFields } from "../../../components/MandatoryFields";
export const Forgotten = () => {
    const router = useRouter();
    const mutation = useSendResetPassword()
    const [isAllEmpty, setIsAllEmpty] = useState(false);
    if (mutation.isSuccess)
        router.push("/forgotten-confirmation")
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        const formData = new FormData(target);
        const currentData: userData = {
            email: formData.get("email") as string
        }
        if (currentData.email == "") {
            setIsAllEmpty(true);
            return;
          } else {
            setIsAllEmpty(false);
          }
        return mutation.mutate(currentData);
    }
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[75%] md:w-[50%] mb-16">
                <h1 className="md:text-4xl text-lg font-bold">Réinitialiser votre Mot de passe</h1>
                <p className="mt-12">Saisissez l'adresse e-mail avec laquelle vous vous êtes inscrit. Nous vous enverrons un lien pour vous connecter et réinitialiser votre mot de passe.</p>
                <div className="mt-6"></div>
                <form action="" onSubmit={handleSubmit}>
                    <InputLabel
                        label={"E-mail"}
                        name={"email"}
                        type={"email"}
                        placeholder={"Entrez votre adresse e-mail"}
                    />
                    <MandatoryFields empty={isAllEmpty} />
                    <ButtonLink label={"Demander un lien"}/>
                </form>
            </div>
        </div>
    )
}