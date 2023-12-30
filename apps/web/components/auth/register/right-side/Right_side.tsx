"use client"

import { GoogleForm } from "../GoogleForm";
import { InputLabel } from "../../../../views/auth/InputLabel";
import { FormEventHandler, useState } from 'react';
import { ToLogin } from "../../ToLogin";
import Link from "next/link";
import { useUserRegisterMutation } from "../../../../services/auth/auth";

type userData = {
    username: string;
    email: string;
    password: string;
}


export const Right_side = () => {
    const mutation = useUserRegisterMutation();

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        const formData = new FormData(target);
        const userData: userData = {
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string}
        mutation.mutate(userData);
    };
    return (
        <>
            <div className="flex space-x-8 cursor-pointer">
                <Link href={"/signup"} className="text-2xl font-semibold">S'inscrire</Link>
                <Link href={"/signin"} className="text-2xl font-semibold">Se connecter</Link>
            </div>
            <GoogleForm/>
            <div className="flex justify-between items-center">
                <div className="w-[15%] md:w-[33%] h-[2px] bg-gray-300"></div>
                    <p className="lg:text-md text-lg mx-auto my-8 font-semibold">Ou avec votre e-mail</p>
                    <div className="w-[15%] md:w-[33%] h-[2px] bg-gray-300"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <InputLabel label={"Nom d'utilisateur"} name={"username"} type={"text"} placeholder={"Entrez votre nom d'utilisateur"}/>
                <div className="mt-6"></div>
                <InputLabel label={"E-mail"} name={"email"} type={"email"} placeholder={"Entrez votre adresse e-mail"} />
                <div className="mt-6"></div>
                <InputLabel label={"Mot de passe"} name={"password"} type={"password"} placeholder={"Entrez votre mot de passe"} />
                <ToLogin/>
            </form>
            <button className="p-3 mt-8 border-2 border-gray-200 rounded-lg flex justify-center items-center">
                <Link href={"/signin"} className="text-semibold text-md lg:text-lg">Avez-vous déjà un compte ? Connectez-vous</Link>
            </button>
          </>
    )
}