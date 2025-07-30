
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// ✅ Import ClerkProvider
import { ClerkProvider } from '@clerk/clerk-react';

const clerkFrontendApi = 'pk_test_d2lyZWQtbW9jY2FzaW4tMTIuY2xlcmsuYWNjb3VudHMuZGV2JA';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkFrontendApi}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
