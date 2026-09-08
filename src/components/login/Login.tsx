import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useMsal } from '@azure/msal-react';
import { EventType } from '@azure/msal-browser';
import { loginRequest } from '../../authConfig.ts';

export default function Login() {
  const { instance } = useMsal();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const callbackId = instance.addEventCallback((event) => {
      // msal-browser has no distinct LOGIN_FAILURE event; loginRedirect failures surface as ACQUIRE_TOKEN_FAILURE.
      if (event.eventType === EventType.ACQUIRE_TOKEN_FAILURE) {
        const authError = event.error;
        const message = authError && 'errorMessage' in authError ? authError.errorMessage : authError?.message;
        setError(message || 'Sign-in failed.');
      }
    });
    return () => {
      if (callbackId) instance.removeEventCallback(callbackId);
    };
  }, [instance]);

  const handleSignIn = () => {
    setError(null);
    instance.loginRedirect(loginRequest).catch((err) => {
      setError(err?.errorMessage ?? err?.message ?? 'Sign-in failed.');
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 3,
      }}
    >
      <Typography variant="h1">Essentials POC</Typography>
      <Box
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          p: 4,
          minWidth: 320,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" sx={{ mb: 3 }}>
          Sign in
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>
            {error}
          </Alert>
        )}
        <Button variant="contained" fullWidth onClick={handleSignIn}>
          {error ? 'Try again' : 'Sign in with Microsoft'}
        </Button>
      </Box>
    </Box>
  );
}

