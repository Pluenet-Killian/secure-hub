import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { HTTPError } from "../HTTPError";
import Cookies from "js-cookie";
import { useFetch } from "../clientFetch";

export type FetchFunction<I = RequestInit> = (
    endpoint: string,
    infos: I
) => Promise<Response>;
  

type TypeRegisterMutation = [
    {
      username: string,
      email: string,
      password: string
    },
    HTTPError,
    { access_token: string; expires_in: number}
];

export const registerUser = (fetch: FetchFunction) => async (user: TypeRegisterMutation[0]) => {
    const {username, email, password} = user;
    const response = await fetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify({username, email, password})
    })
    console.log(response);
    const responseData = await response.json();
    if (!response.ok) throw new HTTPError(responseData);
    const data = responseData;

    console.log("data", data);
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

// const googleAuthentification = (fetchFunc: FetchFunction) => async (body: any) => {
//     const response = await fetchFunc()
// }

// export const useGoogleAuthentificationMutation = () => {
//     const fetchFunc = useFetch();
//     return useMutation({
//         mutationFn: (data: Object) => googleAu
//     })
// }