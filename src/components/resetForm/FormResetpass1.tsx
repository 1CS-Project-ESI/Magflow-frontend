'use client'
import React, { useState } from 'react';
import ButtonBlanc from '../buttons/buttonblanc';
import Button from '../buttons/Button';

const FormResetpass1: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Email :', email);
      };
      return (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 mt-10 mb-7 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="email"
              style={{ fontSize: '0.8em' }}
            />
          </div>
          <div className="flex items-center justify-between">
  <ButtonBlanc>Log In</ButtonBlanc>
  <Button>Envoyer</Button>
</div>

          </form>
  );

};

export default FormResetpass1;