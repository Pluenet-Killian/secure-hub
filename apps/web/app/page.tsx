import Link from "next/link";

export default function Page(): JSX.Element {
  return (
    <main>
      <div className="w-full h-16 bg-black flex justify-end items-center">
        <Link href={"/signup"} className="text-2xl text-white mr-16">Signup</Link>
        <Link href={"/signin"} className="text-2xl text-white mr-16">Signin</Link>
      </div>
    </main>
  );
}
