"use client";
import React from "react";
import LoginLayout from "../loginLayout";
import Image from "next/image";
import logoImage from "../../../public/assets/images/logo/magflow.png";
import LoginForm from "@/components/loginForm/LoginForm";

import Link  from 'next/link';

const LoginPage: React.FC = () => (
  <LoginLayout>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image src={logoImage} alt="Logo" width={218} height={135} />
        </div>

        <h2 className="text-2xl font-medium text-gray-800 mb-2 text-center">
          Bienvenue!
        </h2>
        <h1
          className="text-base font-thin text-[#CBCBCB] text-center mb-2"
          style={{ fontSize: "0.8em" }}
        >
          Connecter à votre compte
        </h1>

        <LoginForm />
        <div className="text-l font-medium text-gray-400 mb-1 text-right"> 
        <Link href="./resetPW/">Mot de passe oublié?</Link>  
        </div>
        <div className="text-xs text-[#CBCBCB] text-center mt-20">
          
          Copyright 2024 Arcana. Tous droits réservés
          
        </div>
      </div>
    </div>
  </LoginLayout>
);

export default LoginPage;
