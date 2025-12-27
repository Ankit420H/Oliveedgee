import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';
import './i18n';

import ErrorBoundary from './components/layout/ErrorBoundary';
import { WishlistProvider } from './context/WishlistContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
