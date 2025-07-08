import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField,
  Typography,
  Box
} from '@mui/material';
import { useAppContext } from '../../context/AppContext';

interface BulkImportProps {
  open: boolean;
  onClose: () => void;
}

const BulkImport: React.FC<BulkImportProps> = ({ open, onClose }) => {
  const [urls, setUrls] = useState('');
  const { addUrl } = useAppContext();
  const [validity, setValidity] = useState(30);

  const handleImport = () => {
    const urlList = urls.split('\n').filter(url => url.trim());
    urlList.forEach(url => {
      if (url.trim()) {
        addUrl(url.trim(), { validityMinutes: validity });
      }
    });
    setUrls('');
    setValidity(30);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Bulk Import URLs</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Enter multiple URLs, one per line
        </Typography>
        <TextField
          multiline
          rows={6}
          fullWidth
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder="https://example.com\nhttps://another-example.com"
          variant="outlined"
        />
        <TextField
          type="number"
          value={validity}
          onChange={e => setValidity(Math.max(1, Number(e.target.value)))}
          label="Validity (min)"
          variant="outlined"
          inputProps={{ min: 1 }}
          helperText="Default: 30 min for all imported URLs"
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleImport} variant="contained" disabled={!urls.trim()}>
          Import URLs
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BulkImport;