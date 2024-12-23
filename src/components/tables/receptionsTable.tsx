"use client";

import React from "react";
import Link from "next/link";
import { Reception } from "@/types";
import Converter from "@/dateConverter";

interface Props {

  BonReçus: Reception[];
}

const Receptiontable: React.FC<Props> = ({ BonReçus }) => {
  const  SortedBonReçus =  BonReçus.sort((a, b) => b.id - a.id);
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light">ID</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              ID du Magasinier
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Date de reception
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell"></th>
          </tr>
        </thead>
        <tbody>
          {SortedBonReçus.map((Bon, index) => (
            <tr key={index} className="text-[#2C2D41] border-b border-gray-200">
              <td className="border-t bg-white text-center px-4 py-4">
                {Bon.id}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {Bon.id_magasinier}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                <Converter date={Bon.deliverydate} />
              </td>
              <td className="border-t bg-white text-center px-4 py-2 md:table-cell flex items-center justify-center">

                <Link
                  href={{
                    pathname: "/receptionDetails",
                    query: { id: Bon.id },
                  }}
                  className="text-gray-500"
                >
                  Details du bon {">>"}
                </Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Receptiontable;
