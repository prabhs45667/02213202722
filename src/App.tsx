import React, { useState, useMemo } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  IconButton,
  Box 
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppProvider } from './context/AppContext';
import Layout from './components/common/Layout';
import UrlShortenerForm from './components/url-shortner/UrlShortenerForm';
import UrlList from './components/url-shortner/UrlList';
import SearchBar from './components/url-shortner/SearchBar';
import Statistics from './components/url-shortner/Statistics';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#1976d2',
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1200 }}>
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Layout>
          <Statistics />
          <UrlShortenerForm />
          <SearchBar />
          <UrlList />
        </Layout>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;