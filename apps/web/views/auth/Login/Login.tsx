import { Left_side } from "../../../components/auth/register/left-side/Left_side";
import { Right_side } from "../../../components/auth/login/right-side/Right_side";
import Image from "next/image";
export const Login = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="w-full h-full flex">
        <div className="mx-24 lg:my-24 my-20 w-[100%]">
          <div className="w-full h-full flex flex-col">
            <Right_side />
          </div>
        </div>
      </div>
    </div>
  );
};
