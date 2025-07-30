import { SignIn, SignUp } from '@clerk/clerk-react';
import { useState } from 'react';

export default function AuthScreen() {
  const [mode, setMode] = useState('sign-in'); // or 'sign-up'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        
        {/* Left Side Branding */}
        <div className="md:w-1/2 bg-black text-white p-8 flex flex-col justify-center">
          <div className="mb-2">
                <span><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe2vpNvFh1oQ9TcAFkvcajWwzBGmfaORRlVg&s" alt="logo" /></span>
            </div>
          <p className="text-sm">Smart, personalized AI-generated freelance proposals.</p>
        </div>

        {/* Right Side Auth */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-4 text-center">
            {mode === 'sign-in' ? 'Login to your account' : 'Create your account'}
          </h3>

          {mode === 'sign-in' ? <SignIn /> : <SignUp />}

          <div className="mt-4 text-center text-sm">
            {mode === 'sign-in' ? (
              <>
                Don’t have an account?{' '}
                <button onClick={() => setMode('sign-up')} className="text-blue-600 underline">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button onClick={() => setMode('sign-in')} className="text-blue-600 underline">
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
