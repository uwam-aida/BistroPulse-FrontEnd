'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Image from 'next/image';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState(''); // Changed from 'id' to 'email' for clarity
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const handleSubmit = async (e: React.FormEvent) => { // Made async
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Replace with actual authentication logic
      console.log('Logging in with', email, password);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect after successful login
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50"> {/* Improved layout */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <div className="flex flex-col items-center mb-6"> {/* Centered logo */}
          <Image 
            src="/icon.png" 
            alt="BistroPulse Logo" 
            width={68}  
            height={68} 
            className="mb-2"
            priority // Added for above-the-fold image
          />
          <div className="text-center"> {/* Centered text */}
            <h1 className="text-4xl font-bold text-blue-600">BistroPulse</h1>
            <p className="text-sm text-blue-500">Food at your doorstep</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 text-center">Sign in to your account</h2> {/* Improved heading */}
          
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-blue-500" />
            <input
              type="email" // Changed to email type for better validation
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 pr-3 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-blue-500" />
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-3 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={8} // Added minimum password length
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading} // Disable during loading
            className={`bg-blue-600 text-white py-2 px-4 rounded w-full transition ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <p className="text-gray-600">New user?</p>
            <button 
              onClick={() => router.push('/signup')} 
              className="text-blue-500 hover:underline"
            >
              Sign up
            </button>
          </div>
          
          <button 
            onClick={() => router.push('/forgotPassword')}
            className="text-blue-500 hover:underline"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}