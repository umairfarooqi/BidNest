// import { SignIn, SignUp } from '@clerk/clerk-react';
// import { useState } from 'react';

// export default function AuthScreen() {
//   const [mode, setMode] = useState('sign-in'); // or 'sign-up'

//   return (
//     <div className="min-h-screen w-full flex">
//       {/* Left Side - Branding */}
//       <div className="w-1/2 bg-black text-white flex items-center justify-center p-8">
//         <div>
//           <div className="flex items-center mb-4 space-x-4">
//             <img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe2vpNvFh1oQ9TcAFkvcajWwzBGmfaORRlVg&s"
//               alt="logo"
//               className="h-12 w-12 object-contain"
//             />
//             <h1 className="text-3xl font-bold">BidNest</h1>
//           </div>
//           <p className="text-sm">Smart, personalized AI-generated freelance proposals.</p>
//         </div>
//       </div>

//       {/* Right Side - Auth */}
//       <div className="w-1/2 bg-white flex items-center justify-center p-10">
//         <div className="w-full max-w-md">
//           <h3 className="text-2xl font-semibold mb-6 text-center">
//             {mode === 'sign-in' ? 'Login to your account' : 'Create your account'}
//           </h3>

//           {mode === 'sign-in' ? <SignIn /> : <SignUp />}

//           <div className="mt-6 text-center text-sm">
//             {mode === 'sign-in' ? (
//               <>
//                 Don’t have an account?{' '}
//                 <button onClick={() => setMode('sign-up')} className="text-blue-600 underline">
//                   Sign up
//                 </button>
//               </>
//             ) : (
//               <>
//                 Already have an account?{' '}
//                 <button onClick={() => setMode('sign-in')} className="text-blue-600 underline">
//                   Sign in
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
