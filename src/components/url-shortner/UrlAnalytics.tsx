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

  const isExpired = url.validUntil && new Date(url.validUntil) < new Date();
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>URL Analytics</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Short URL
          </Typography>
          <Typography variant="body1" color={isExpired ? 'text.secondary' : 'primary'} gutterBottom>
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
            <Chip label={isExpired ? 'Expired' : `${url.clicks} clicks`} color={isExpired ? 'default' : 'primary'} />
            <Chip label={`Created ${formatDate(url.createdAt)}`} variant="outlined" />
            {url.validUntil && (
              <Chip label={`Expiry ${formatDate(url.validUntil)}`} variant="outlined" color={isExpired ? 'default' : 'success'} />
            )}
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