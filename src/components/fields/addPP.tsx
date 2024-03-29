import Image from "next/image";
import Link from "next/link";
import Addphoto from "../../../public/assets/icons/Add photo.svg";

export default function AddPP() {
  return (
    <div className="flex items-center justify-between  mx-6">
      <span className="font-bold">Photo de Profile</span>
      <Link href="" >
        <Image src={Addphoto} alt="add logo" width={25} height={25} />
      </Link>
    </div>
  );
}
