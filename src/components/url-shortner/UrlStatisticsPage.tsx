import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import UrlList from './UrlList';

const UrlStatisticsPage: React.FC = () => (
  <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>URL Statistics</Typography>
      <UrlList />
    </Paper>
  </Box>
);

export default UrlStatisticsPage;
