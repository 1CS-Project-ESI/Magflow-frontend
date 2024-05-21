import Image from "next/image";
import Passw from "../../../public/assets/icons/edit.svg";
import Link from "next/link";
import { useState } from "react";
import { ProductCommandeIn, ProduitBCI } from "@/types";
import inc from "../../../public/assets/icons/Increment.svg";
import dec from "../../../public/assets/icons/Decrement.svg";

interface Props {
  ProduitBCI: ProductCommandeIn;
}

const QuantityServie: React.FC<Props> = ({ ProduitBCI }) => {
  const [quantity, setQuantity] = useState(ProduitBCI.accordedQuantity);
  const minQuantity = 0;

  const handleChange = (event: { target: { value: string } }) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (isNaN(newQuantity) || newQuantity < minQuantity) {
      setQuantity(0);
      return;
    }
    setQuantity(newQuantity);
  };

  const incrementQuantity = () => {
    setQuantity(Math.min(quantity + 1, ProduitBCI.accordedQuantity));
  };

  const decrementQuantity = () => {
    setQuantity(Math.max(quantity - 1, minQuantity));
  };

  return (
    <div className="flex items-center justify-center">
      <Image
        src={dec}
        onClick={decrementQuantity}
        alt="Changer"
        width={20}
        height={20}
      />
      <input
        type="text"
        value={quantity}
        onChange={handleChange}
        min={minQuantity}
        className="border border-[#c4c4c4] mx-2 rounded-lg w-18 h-10"
      />
      <Image
        src={inc}
        onClick={incrementQuantity}
        alt="Changer"
        width={20}
        height={20}
      />
    </div>
  );
};

export default QuantityServie;