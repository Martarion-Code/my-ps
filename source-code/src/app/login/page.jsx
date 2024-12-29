'use client'
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <button 
          onClick={() => signIn('google', { callbackUrl: 'http://localhost:3002/admin' })} 
          className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200 mb-4"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}