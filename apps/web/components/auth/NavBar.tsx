import Image from "next/image"
import Link from "next/link"

export const Navbar = () => {
    return (
        <>
             <nav className="bg-[#3834b5] fixed w-full z-20 top-0 start-0 border-b border-gray-600 h-[60px]">
                <div className="w-full h-full flex justify-left mx-24 space-x-6 text-white items-center text-xl cursor-pointer font-semibold">
                    <Link href={"/"}>Accueil</Link>
                    <Link href={"/signup"}>S'inscrire</Link>
                    <Link href={"/signin"}>Se connecter</Link>
                </div>
            </nav>
        </>
    )
}