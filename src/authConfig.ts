import type { Configuration } from '@azure/msal-browser';

// Entra ID app registration values — set these in a .env file (not committed) before deploying.
// VITE_AZURE_CLIENT_ID, VITE_AZURE_REDIRECT_URI — per AUTH-HANDOFF.md (multi-tenant app, fixed 'common' authority)
export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID ?? '',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI ?? window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
  },
};

export const loginRequest = {
  scopes: ['api://cbabb8d4-6816-4328-963f-8398af33a2a6/access_as_user'],
};
