import Image from "next/image";
import Addphoto from "../../../public/assets/icons/Add photo.svg";

export default function AddLogo() {
  return (
    <div className="flex items-center justify-between px-10 w-[629px] h-[60px] mx-[5px] my-[10px] bg-[#fffffe]">
      <label
        htmlFor="emailNotification"
        className="mr-2 font-['poppins'] text-[25px] text-[#2C2D41]"
      >
        Logo
      </label>
      <Image src={Addphoto} alt="add logo" width={43} height={43} />
    </div>
  );
}
