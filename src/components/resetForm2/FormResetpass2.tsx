'use client'
import React, { useState } from 'react';
import Button from '../buttons/Button';
import ButtonBlanc from '../buttons/buttonblanc';

const FormResetpass2: React.FC = () => {
    const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Nouveau mot de passe :', newPassword);
      };

      return (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="NouveauPassword" className="block text-gray-700 font-bold mb-2">
            
            </label>
            <input
          type="password"
          id="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 mt-7 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="password"
          style={{ fontSize: '0.8em' }}
        />
          </div>
          <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">

        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-7 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Confirmez votre nouveau mot de passe" 
          style={{ fontSize: '0.8em' }}// Improved placeholder
        />
      </div>
          <div className="flex items-center justify-between">
  <Button>Annuler</Button>
  <ButtonBlanc>Enregistrer</ButtonBlanc>
</div>

          </form>
  );

};

export default FormResetpass2;