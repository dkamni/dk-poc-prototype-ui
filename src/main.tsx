import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import App from './App.tsx';
import theme from './theme.ts';
import { msalConfig } from './authConfig.ts';

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </MsalProvider>
  </StrictMode>,
);
