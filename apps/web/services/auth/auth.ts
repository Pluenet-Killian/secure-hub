import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { HTTPError } from "../HTTPError";
import Cookies from "js-cookie";
import { useFetch } from "../clientFetch";
import { useRouter } from "next/router";

export type FetchFunction<I = RequestInit> = (
    endpoint: string,
    infos: I
) => Promise<Response>;
  

type TypeRegisterMutation = [
    {
      username?: string,
      code?: string,
      email?: string,
      password?: string
      password_confirmation?: string;
      verifyCode?: string
    },
    HTTPError,
    { access_token: string; expires_in: number}
];

export const registerUser = (fetch: FetchFunction) => async (user: TypeRegisterMutation[0]) => {
    const {username, email, password, password_confirmation} = user;
    const response = await fetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify({username, email, password, password_confirmation})
    })
    const responseData = await response.json();
    if (!response.ok) throw new HTTPError(responseData);
    const data = responseData;

    if (data.access_token) {
        Cookies.set("access_token", data.access_token, {
            expires: data.expiresIn,
        })
    }
    return data;
}

export const useUserRegisterMutation = () => {
    const fetch = useFetch();
    return useMutation<TypeRegisterMutation[2], HTTPError, TypeRegisterMutation[0]>({
        mutationFn: (user: TypeRegisterMutation[0]) => registerUser(fetch)(user),
    })    
}

const loginUser = (fetch: FetchFunction) => async (user: TypeRegisterMutation[0]) => {
    const {username, email, password} = user;
    const response = await fetch("/auth/signin", {
        method: "POST",
        body: JSON.stringify({username, email, password})
    })
    const responseData = await response.json();
    if (!response.ok) throw new HTTPError(responseData);
    const data = responseData;

    if (data.access_token) {
        Cookies.set("access_token", data.access_token, {
            expires: data.expiresIn,
        })
    }
    return data;
}

export const useUserLoginMutation = () => {
    const fetch = useFetch();
    return useMutation<TypeRegisterMutation[2], HTTPError, TypeRegisterMutation[0]>({
        mutationFn: (user: TypeRegisterMutation[0]) => loginUser(fetch)(user),
    })    
}

const sendResetPassword = (fetch: FetchFunction) => async (userData: TypeRegisterMutation[0]) => {
    const {email} = userData;
    const response = await fetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({email})
    })
    const responseData = await response.json();
    if (!response.ok) throw new HTTPError(responseData)
    return responseData;
}

export const useSendResetPassword = () => {
    const fetch = useFetch();
    return useMutation<TypeRegisterMutation[2], HTTPError, TypeRegisterMutation[0]>({
        mutationFn: (user: TypeRegisterMutation[0]) => sendResetPassword(fetch)(user),
    })    
}

const sendResetPasswordConfirmation = (fetch: FetchFunction) => async (userData: TypeRegisterMutation[0]) => {
    const {email, code, password, password_confirmation} = userData;
    const response = await fetch("/auth/reset-password-confirmation", {
        method: "POST",
        body: JSON.stringify({email, code, password, password_confirmation})
    })
    const responseData = await response.json();
    if (!response.ok) throw new HTTPError(responseData)
    return responseData;
}

export const useSendResetPasswordConfirmation = () => {
    const fetch = useFetch();
    return useMutation<TypeRegisterMutation[2], HTTPError, TypeRegisterMutation[0]>({
        mutationFn: (user: TypeRegisterMutation[0]) => sendResetPasswordConfirmation(fetch)(user),
    })    
}

const sendDoubleAuthentification = (fetch: FetchFunction) => async (userData: TypeRegisterMutation[0]) => {
    console.log("ok");
    const {email, verifyCode} = userData;
    console.log(email, verifyCode);
    const response = await fetch("/auth/verify", {
        method: "POST",
        body: JSON.stringify({email, verifyCode})
    })
    console.log(response);
    const responseData = await response.json();
    if (!response.ok) throw new HTTPError(responseData)
    return responseData;
}

export const useSendDoubleAuthentification = () => {
    const fetch = useFetch();
    return useMutation<TypeRegisterMutation[2], HTTPError, TypeRegisterMutation[0]>({
        mutationFn: (user: TypeRegisterMutation[0]) => sendDoubleAuthentification(fetch)(user),
    })    
}