import { Box, LoadingOverlay } from '@mantine/core';
import { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, useNavigate } from 'react-router-dom';
import useCookies from './hooks/useCookies';
import { PropBaseT } from './types';

const MainPage = lazy(() => import('./Pages/index'));
const AuthPage = lazy(() => import('./Pages/Auth/index'));
const WalletPage = lazy(() => import('./Pages/Wallet/index'));

const Loading = () => (
  <Box pos="relative" className="full-screen">
    <LoadingOverlay zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
  </Box>
);

const ProtectedRoute = ({ children }:PropBaseT) => {
  const { value } = useCookies('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!value) {
      navigate('/');
    }
  }, [value, navigate]);

  return value ? children : null;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <MainPage />
      </Suspense>
    ),
  },
  {
    path: '/auth',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthPage />
      </Suspense>
    ),
  },
  {
    path: '/wallet',
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectedRoute>
          <WalletPage />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/wallet/:wallletAddress',
    element: (
      <Suspense fallback={<Loading />}>
        <WalletPage />
      </Suspense>
    ),
  },
]);

export default router;