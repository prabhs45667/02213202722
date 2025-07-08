import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { useAppContext } from '../../context/AppContext';
import BulkImport from './BulkImport';

const UrlShortenerForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [bulkImportOpen, setBulkImportOpen] = useState(false);
  const [validity, setValidity] = useState(30);
  const [customCode, setCustomCode] = useState('');
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
    addUrl(urlToCheck, {
      customCode: customCode.trim() ? customCode.trim() : undefined,
      validityMinutes: validity,
    });
    setUrl('');
    setCustomCode('');
    setValidity(30);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
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
          <Grid {...{ item: true, xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              placeholder="Custom shortcode (optional)"
              variant="outlined"
              inputProps={{ maxLength: 20 }}
              helperText="Alphanumeric only, must be unique"
            />
          </Grid>
          <Grid {...{ item: true, xs: 12, sm: 3 }}>
            <TextField
              fullWidth
              type="number"
              value={validity}
              onChange={e => setValidity(Math.max(1, Number(e.target.value)))}
              label="Validity (min)"
              variant="outlined"
              inputProps={{ min: 1 }}
              helperText="Default: 30 min"
            />
          </Grid>
          <Grid {...{ item: true, xs: 12, sm: 3 }}>
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
          <Grid {...{ item: true, xs: 12 }}>
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