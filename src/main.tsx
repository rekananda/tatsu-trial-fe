import '@assets/css/app.css';
import '@assets/css/font.css';
import '@assets/css/global.css';
import '@assets/css/mantine.scss';
import '@mantine/carousel/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/nprogress/styles.css';
import { NavigationProgress} from '@mantine/nprogress';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.tsx';
import mainTheme from './config/mantineTheme';
import StoreProvider from './store/StoreProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider theme={mainTheme} defaultColorScheme="auto">
        <NavigationProgress />
        <App />
        <ToastContainer />
      </MantineProvider>
    </StoreProvider>
  </React.StrictMode>,
);
