import { useState } from 'react';
import { Layout } from './layout';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Toaster } from "react-hot-toast";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4361ee',
      light: '#4895ef',
      dark: '#3f37c9',
    },
    secondary: {
      main: '#f72585',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router}/>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
    </ThemeProvider>
  );
}

export default App;