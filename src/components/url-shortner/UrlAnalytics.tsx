import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  Typography,
  Box,
  Chip
} from '@mui/material';
import { UrlData } from '../../types';

interface UrlAnalyticsProps {
  url: UrlData | null;
  open: boolean;
  onClose: () => void;
}

const UrlAnalytics: React.FC<UrlAnalyticsProps> = ({ url, open, onClose }) => {
  if (!url) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>URL Analytics</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Short URL
          </Typography>
          <Typography variant="body1" color="primary" gutterBottom>
            short.url/{url.shortUrl}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Original URL
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ wordBreak: 'break-all' }}>
            {url.originalUrl}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Statistics
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Chip label={`${url.clicks} clicks`} color="primary" />
            <Chip label={`Created ${formatDate(url.createdAt)}`} variant="outlined" />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UrlAnalytics;