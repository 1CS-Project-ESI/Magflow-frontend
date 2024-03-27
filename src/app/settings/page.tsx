"use client";

import React from "react";
import RootLayout from "../rootLayout";
import AddLogo from "@/components/fields/add-logo";
import Field_email from "@/components/fields/email-field";
import Settva from "@/components/fields/set-tva";
import Langue from "@/components/fields/langue";
import Password from "@/components/fields/password";
import Link from "next/link";

const SettingsPage = () => {
  return (
    <RootLayout>
      <div className="flex items-center mx-[50px] mt-[30px] mb-[30px] font-['poppins'] text-[18px] text-[#2C2D41]">
        <Link
          href="/general-page"
          className="border-b-[2px] pb-[2px] mr-[20px] border-[#510A6D]"
        >
          Général
        </Link>
        <Link href="/profile-edit" className="pb-[2px] mr-[20px]">
          Modifier Profile
        </Link>
      </div>
      <div className="flex items-center flex-col px-10 w-[1350px] h-[600px] rounded-xl border-[1px] border-[#C4C4C4] bg-[#fffffe]">
        <div className="flex items-center flex-row justify-between w-[1300px] ">
          <Field_email />
          <Langue />
        </div>
        <div className="flex items-center flex-row justify-between w-[1300px]">
          <Settva />
          <AddLogo />
        </div>

        <Password />
      </div>
    </RootLayout>
  );
};

export default SettingsPage;
