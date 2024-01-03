type buttonLinkType = {
    label: string
}

export const ButtonLink = ({label}: buttonLinkType) => {
    return (
        <div className="w-48 h-20 rounded-lg bg-[#423ED8] mt-8 flex items-center justify-center cursor-pointer">
            <button className="text-white font-semibold text-lg">{label}</button>
        </div>
    )
}