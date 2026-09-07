import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../authConfig.ts';

export default function Login() {
  const { instance } = useMsal();

  const handleSignIn = () => {
    instance.loginRedirect(loginRequest);
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
        <Button variant="contained" fullWidth onClick={handleSignIn}>
          Sign in with Microsoft
        </Button>
      </Box>
    </Box>
  );
}
