import ProposalForm from './components/ProposalForm';
import AuthScreen from './components/AuthScreen';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

function App() {
  return (
    <>
      <SignedOut>
        <AuthScreen />
      </SignedOut>

      <SignedIn>
        <div className="min-h-screen bg-gray-100 p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">BidNest – AI Proposal Generator</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <ProposalForm />
        </div>
      </SignedIn>
    </>
  );
}

export default App;
