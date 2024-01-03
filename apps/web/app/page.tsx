import Link from "next/link";
import Image from "next/image";
export default function Page(): JSX.Element {
  return (
    <main>
      <div className=" w-[80%] mx-auto h-[64rem] rounded-lg">
        <Image src={"/signup_image.jpeg"} alt="bg-img"  objectPosition="center"  objectFit="cover" width={1500} height={1500} className="w-full h-full" />
        
      </div>
    </main>
  );
}
