import Image from "next/image";
// import Passw from "../../../public/assets/icons/ch_pass.svg";
import Link from "next/link";
export default function Password() {
  return (

    <Link href="#" className="">
      <div className="flex items-center justify-between px-10 w-[1290px] h-[60px] my-[10px] bg-[#fffffe]">
        <label
          htmlFor="emailNotification"
          className="mr-2 font-['poppins'] text-[25px] text-[#2C2D41]"
        >
          Changer le mote de passe
        </label>
        {/* <Image src={Passw.src} alt="Changer" width={28} height={28} /> */}
      </div>
    </Link>
  );
}
