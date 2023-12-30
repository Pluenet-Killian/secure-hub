import {useGoogleLogin } from "@react-oauth/google";

export const GoogleForm = () => {

  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });
    return (
        <div onClick={() => login()} className="w-full min-h-[60px] border border-black rounded-lg mt-8 cursor-pointer">
            <div className="flex w-full h-full items-center justify-center">
                <p className="font-semibold text-lg">Se connecter avec Google</p>
            </div>
        </div>
    )
}