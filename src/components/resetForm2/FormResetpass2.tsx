
import React, { useState, useEffect } from 'react';
import Button from '../buttons/Button'; 
import ButtonBlanc from '../buttons/buttonblanc'; 
import { useRouter } from 'next/router'; 
import  useLocation  from 'next/router'; 
const FormResetpass2: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  var url = window.location;  // exraction the resetToken from url 
  var resettoken = new URLSearchParams(url.search).get('resettoken');

  console.log(`this is the reset token extarcetd from the url $${resettoken}`);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      console.log('Passwords do not match.');
      return;
    }

    try {
   
      const response = await fetch(`http://localhost:4000/api/auth/reset-password/${resettoken}`, {
    
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });

      if (response.ok) {
        console.log('Password reset successfully!');
        window.location.href = '/';
        
      } else {
        const errorData = await response.json();
        console.log(errorData.message || 'Error resetting password.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="reset-password-container">
    
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="NouveauPassword" className="block text-gray-700 font-bold mb-2">
            Nouveau mot de passe:
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
            Confirmez votre nouveau mot de passe:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-7 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Confirmez votre nouveau mot de passe"
            style={{ fontSize: '0.8em' }} 
          />
        </div>
          <div className="flex items-center justify-between">
            <Button>Annuler</Button>
            <ButtonBlanc>Enregistrer</ButtonBlanc>
          </div>
      </form>
    </div>
  );
};

export default FormResetpass2;
