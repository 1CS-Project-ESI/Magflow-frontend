
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
    // console.log("this is the access token", accessToken);

    localStorage.setItem('accessToken', accessToken);
    // const  storedToken  =  await localStorage.getItem('accessToken');
    // console.log('storedToken stored in local storage:', localStorage.getItem('accessToken'));
  // //  /// stting cookies 
  // const data = await response.json();
  // const { accessToken: token } = data;

  // //Store the access token in a cookie with security flags
  // Cookies.set('accessToken', token, {
  //   expires: 1, // Set the cookie to expire in 1 day
  //   sameSite: 'strict', // Restrict the cookie to the same site
  //   // secure: true, // Only send the cookie over HTTPS
  //   httpOnly: true, // Prevent client-side scripts from accessing the cookie
  // });
  
      // Redirect to the desired page after successful login
      window.location.href = 'comptes/';
  
      console.log('Login successful:', data);
  

      // Reset form fields and error state
      setEmail('');
      setPassword('');
      setError(null);
    } catch (error) {
      setError((error as Error).message || 'Failed to login');
    } finally {
      setLoading(false); // Stop loading state
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


// accessToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwLCJpYXQiOjE3MTE5ODM4MTcsImV4cCI6MTcxMjA3MDIxN30.3pO__LdBHkdxVkJbKpKehmjYlg1yvEu_9sZqhgS_XQU"
// accessToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwLCJpYXQiOjE3MTIwNDA0NDcsImV4cCI6MTcxMjEyNjg0N30.TeeaioyQ_DqrJPz9kCfckE3-d8LpHN_m_KhuLnKGwj4"