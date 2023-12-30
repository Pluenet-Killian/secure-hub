import { Left_side } from "../../../components/auth/register/left-side/Left_side";
import { Right_side } from "../../../components/auth/register/right-side/Right_side";
import Image from "next/image";
export const Register = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="w-full h-full flex">
        <div className="w-[50%] lg:block hidden h-full relative bottom-8">
        <Image
          src="/signup_image.jpeg"
          alt="bg-img"
          layout="fill"
          objectFit=""
          className="object-right"
        />
        </div>

        <div className="mx-12 lg:my-24 my-20 w-[100%] lg:w-[50%]">
          <div className="w-full h-full flex flex-col">
            <Right_side />
          </div>
        </div>
      </div>
    </div>
  );
};
