"use client";

import { GoogleForm } from "../../register/GoogleForm";
import { InputLabel } from "../../../../views/auth/InputLabel";
import { FormEventHandler, useState } from "react";
import { ToLogin } from "../../ToLogin";
import Link from "next/link";
import { useUserLoginMutation } from "../../../../services/auth/auth";
import { useRouter } from "next/navigation";
import { MandatoryFields } from "../../../MandatoryFields";

export type userData = {
  username?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  code?: string
  verifyCode?: string
};

export const Right_side = () => {
  const mutation = useUserLoginMutation();
  const [isAllEmpty, setIsAllEmpty] = useState(false);
  const router = useRouter();
  if (mutation.isSuccess) router.push("/");
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    const formData = new FormData(target);
    const userData: userData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    if (userData.email == "" || userData.password == "") {
      setIsAllEmpty(true);
      return;
    } else {
      setIsAllEmpty(false);
    }
    mutation.mutate(userData);
  };
  
  return (
    <>
      <div className="flex space-x-8 cursor-pointer">
        <Link
          href={"/signup"}
          className="text-2xl md:text-3xl font-bold hover:text-black text-gray-700"
        >
          S'inscrire
        </Link>
        <Link
          href={"/signin"}
          className="text-2xl md:text-3xl font-bold hover:text-black text-gray-700"
        >
          Se connecter
        </Link>
      </div>
      <GoogleForm />
      <div className="flex justify-between items-center">
        <div className="w-[15%] md:w-[33%] h-[2px] bg-gray-300"></div>
        <p className="lg:text-md text-lg mx-auto my-8 font-semibold">
          Ou avec votre e-mail
        </p>
        <div className="w-[15%] md:w-[33%] h-[2px] bg-gray-300"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-6"></div>
        <InputLabel
          label={"E-mail"}
          name={"email"}
          type={"email"}
          placeholder={"Entrez votre adresse e-mail"}
        />
        <div className="mt-6"></div>
        <InputLabel
          label={"Mot de passe"}
          name={"password"}
          type={"password"}
          placeholder={"Entrez votre mot de passe"}
        />
        <ToLogin />
      </form>
      <MandatoryFields empty={isAllEmpty} />
      <button className="p-3 mt-8 border-2 border-gray-200 rounded-lg flex justify-center items-center">
        <Link href={"/signup"} className="text-semibold text-md lg:text-lg">
          Vous n'avez pas encore de compte ? Créez un compte
        </Link>
      </button>
    </>
  );
};
