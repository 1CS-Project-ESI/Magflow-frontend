import Image from "next/image";
import Passw from "../../../public/assets/icons/edit.svg";
import Link from "next/link";
export default function Password() {
  return (
    <Link href="#" >
      <div className="flex items-center justify-between mx-6 my-4">
        <span className="font-bold">
          Changer le mote de passe
        </span>
        <Image src={Passw.src} alt="Changer" width={25} height={25} />
      </div>
    </Link>
  );
}
