import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { useAppContext } from '../../context/AppContext';
import BulkImport from './BulkImport';

const UrlShortenerForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [bulkImportOpen, setBulkImportOpen] = useState(false);
  const { addUrl } = useAppContext();

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    const urlToCheck = url.startsWith('http') ? url : `https://${url}`;
    
    if (!isValidUrl(urlToCheck)) {
      setError('Please enter a valid URL');
      return;
    }

    addUrl(urlToCheck);
    setUrl('');
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          {/* Use spread operator to pass props to Grid items to work around TS/MUI bug */}
          <Grid {...{ item: true, xs: 12 }}>
            <TextField
              fullWidth
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your long URL here..."
              variant="outlined"
              error={!!error}
              helperText={error}
            />
          </Grid>
          <Grid {...{ item: true, xs: 12, sm: 8 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={!url.trim()}
            >
              Shorten URL
            </Button>
          </Grid>
          <Grid {...{ item: true, xs: 12, sm: 4 }}>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              startIcon={<UploadIcon />}
              onClick={() => setBulkImportOpen(true)}
            >
              Bulk Import
            </Button>
          </Grid>
        </Grid>
      </Box>
      <BulkImport open={bulkImportOpen} onClose={() => setBulkImportOpen(false)} />
    </>
  );
};

export default UrlShortenerForm;