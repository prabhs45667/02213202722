import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import UrlShortenerForm from './UrlShortenerForm';

const UrlShortenerPage: React.FC = () => (
  <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      <UrlShortenerForm />
    </Paper>
  </Box>
);

export default UrlShortenerPage;
