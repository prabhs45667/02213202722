import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', py: 2, mt: 4 }}>
      <Typography variant="body2" color="text.secondary">
        © 2024 URL Shortener
      </Typography>
    </Box>
  );
};

export default Footer;