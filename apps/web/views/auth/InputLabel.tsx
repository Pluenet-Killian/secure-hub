type Input = {
    label: string,
    name: string,
    type: string,
    placeholder: string,
    // eslint-disable-next-line no-unused-vars
}

export const InputLabel = ({label, name, type, placeholder}: Input) => {
    return (
        <>
            <div className="flex justify-between">
                <label className="text-lg text-gray-600 font-semibold" htmlFor={name}>{label}</label>
                {label == "Mot de passe" ? <label className="text-[#423ED8] cursor-pointer font-medium" htmlFor={name}>Mot de passe oublié ?</label> : <></>}
            </div>
            <input name={name} className="bg-gray-100 mt-3 px-2 py-3 pl-4 font-semibold rounded-lg w-full" type={type} placeholder={placeholder} />
        </>
    )
}