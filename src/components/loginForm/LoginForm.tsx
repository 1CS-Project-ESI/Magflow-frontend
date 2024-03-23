'use client'
import React, { useState } from 'react';
import Button from '../buttons/Button';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email :', email);
    console.log('Mot de passe :', password);
  };

  return (
    <div >
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
        
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="email"
          style={{ fontSize: '0.9em' }}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
         
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="password"
          style={{ fontSize: '0.9em' }}
        />
      </div>

      <div className="flex items-center justify-between mb-10 mt-5" >
      <div className="flex items-center" style={{ fontSize: '0.8em' }}>
        <input type="checkbox" id="rememberMe" className="mr-2" />
        <label htmlFor="rememberMe" className="text-gray-700">Remember me</label>
      </div>
      <a href="/resetPW" className="text-sm text-gray-600 hover:text-gray-700" style={{ fontSize: '0.8em' }}>Mot de passe oublié?</a>
    </div>

      <Button type="submit" path='/comptes'>Log In</Button>
      
    </form>
    </div>
  );
};

export default LoginForm;