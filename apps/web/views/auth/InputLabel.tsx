import Link from "next/link"

type Input = {
    label: string,
    name: string,
    type: string,
    placeholder: string,
    goodPass?: boolean,
}

export const InputLabel = ({label, name, type, placeholder, goodPass}: Input) => {
    return (
        <>
            <div className="flex justify-between">
                <label className="text-lg text-gray-600 font-semibold" htmlFor={name}>{label}</label>
                {label == "Mot de passe" && placeholder == "Entrez votre mot de passe" ? <Link href={"/forgotten"} className="text-[#423ED8] cursor-pointer font-medium">Mot de passe oublié ?</Link> : <></>}
                {goodPass == true ? <></> : label == "Confirmation mot de passe" ? <label className="text-[#ff6a4f] cursor-pointer font-medium" htmlFor={name}>Répétez le même mot de passe</label> : <></>}
            </div>
            <input name={name} className="bg-gray-100 mt-3 px-2 py-3 pl-4 font-semibold rounded-lg w-full" type={type} placeholder={placeholder} />
        </>
    )
}