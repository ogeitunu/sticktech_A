import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Handle benign HMR / WebSocket connection errors in sandbox environment
window.addEventListener('unhandledrejection', (event) => {
  if (
    event.reason &&
    (typeof event.reason === 'string'
      ? event.reason.includes('WebSocket')
      : event.reason?.message?.includes('WebSocket'))
  ) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
