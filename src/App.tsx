import Box from '@mui/material/Box';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import Login from './components/login/Login.tsx';
import { queryClient, router } from './router.tsx';

export default function App() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthenticatedTemplate>
    </Box>
  );
}
