"use client";
import React from "react";
import FormResetpass1 from "@/components/resetForm/FormResetpass1";
import LoginLayout from "../loginLayout";

const resetpassword: React.FC = () => (
  <LoginLayout>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="grid grid-cols-1 gap-4">
          <h2 className="text-2xl text-gray-800 mb-2 text-center">
            Mot de passe oublié
          </h2>
          <h1 className="text-xs font-thin text-[#CBCBCB] text-center mb-2">
            Pour recevoir un nouveau mot de passe, veuillez indiquer ci-dessous
            votre adresse email
          </h1>
        </div>
        <FormResetpass1 />
      </div>
    </div>
  </LoginLayout>
);

export default resetpassword;
