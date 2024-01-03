export const MandatoryFields = ({empty}: {empty: boolean}) => {
    return (
        <>
            {empty ? 
            <div className="w-full h-20 border-2 border-red-800 rounded-lg bg-[#FFF6EF] mt-8 flex items-center">
                <p className="ml-6">Veuillez remplir tous les champs</p>
            </div> : 
            <></>
            }
        </>
    )
}