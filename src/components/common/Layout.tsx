import React from 'react';
import { Container, Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from '../url-shortner/ErrorBoundary';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;