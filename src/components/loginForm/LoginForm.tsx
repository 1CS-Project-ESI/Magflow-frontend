
import React, { useState } from 'react';
import Button from '../buttons/Button';
import { ButtonProps } from '@/types';
import Cookies from 'js-cookie';


const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Check if email and password are not empty
    if (email.trim() === '' || password.trim() === '') {
      setError('Email and password are required');
      return;
    }

    setLoading(true); // Start loading state

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

    const data = await response.json();
    const { accessToken } = data;

    localStorage.setItem('accessToken', accessToken);
   


      window.location.href = 'comptes/';
  
      console.log('Login successful:', data);
  

    
      setEmail('');
      setPassword('');
      setError(null);
    } catch (error) {
      setError((error as Error).message || 'Failed to login');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
            style={{ fontSize: '0.9em' }}
          />
        </div>
        {/* Password input */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Mot de passe"
            style={{ fontSize: '0.9em' }}
          />
        </div>
        {/* Login button */}
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Log In'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;

