import Image from "next/image";

export const Left_side = () => {
    return (
        <>
        <Image
            className="w-full h-full"
            src="/signup_image.jpg"
            width={500}
            height={1000}
            alt="bg-img"
            objectFit="cover"
          />
        </>
    )
}