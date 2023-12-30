import Cookies from "js-cookie"

interface FetchOptions{
    params?: Record<string, any>;
    headers?: HeadersInit;
    [key: string]: any;
}

const JWT_COOKIE_NAME = "access_token";
const API: string = process.env.NEXT_PUBLIC_API_URL!;
console.log(API);
export const useFetch = () => {
    return async (
        endpoint: string,
        { params = {}, headers: reqHeaders, ...infos}: FetchOptions = {}
    ): Promise<Response> => {
        const token = Cookies.get(JWT_COOKIE_NAME);
        console.log("token", token);
        const headers = {
            ...(token ? {Authorization: "Bearer " + token}: {}),
            Accept: "application/json",
            "Content-Type": "application/json",
            ...reqHeaders,
        };
        console.log(params);
        console.log(endpoint);
        return fetch(API + endpoint, {
            headers,
            ...infos,
        })
    }
}