import Image from "next/image";
import Link from "next/link";
import Addphoto from "../../../public/assets/icons/Add photo.svg";

export default function AddLogo() {
  return (
    <div className="flex items-center justify-between w-full m-4 px-10">
      <span className="font-bold">Logo de MagFlow</span>
      <Link href="" >
        <Image src={Addphoto} alt="add logo" width={25} height={25} />
      </Link>
    </div>
  );
}
