"use client";
import React from "react";
import FormResetpass2 from "@/components/resetForm2/FormResetpass2";
import LoginLayout from "../loginLayout";

const resetpassword: React.FC = () => (
  <LoginLayout>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="grid grid-cols-1 gap-4">
          <h2 className="text-2xl text-gray-800 mb-2 text-center">
            Un nouveau mot de passe
          </h2>
          <h1 className="text-xs font-thin text-[#CBCBCB] text-center mb-2">
            Veuillez saisir votre nouveau mot de passe ci-dessous , puis
            enregistrer les modifications
          </h1>
        </div>
        <FormResetpass2 />
      </div>
    </div>
  </LoginLayout>
);

export default resetpassword;
