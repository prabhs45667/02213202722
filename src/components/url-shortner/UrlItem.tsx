import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Box, 
  Snackbar,
  Chip,
  Tooltip 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { UrlData } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface UrlItemProps {
  url: UrlData;
}

const UrlItem: React.FC<UrlItemProps> = ({ url }) => {
  const { deleteUrl, incrementClicks } = useAppContext();
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`short.url/${url.shortUrl}`);
    setShowCopied(true);
  };

  const handleOpen = () => {
    incrementClicks(url.id);
    window.open(url.originalUrl, '_blank');
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <>
      <Card sx={{ mb: 2, '&:hover': { boxShadow: 3 } }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <Box sx={{ flex: 1, mr: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body1" color="primary" fontWeight="medium">
                  short.url/{url.shortUrl}
                </Typography>
                <Chip 
                  label={`${url.clicks} clicks`} 
                  size="small" 
                  color="primary" 
                  variant="outlined" 
                />
              </Box>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%' 
                }}
              >
                {url.originalUrl}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                Created: {formatDate(url.createdAt)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Tooltip title="Open URL">
                <IconButton onClick={handleOpen} size="small">
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Copy short URL">
                <IconButton onClick={handleCopy} size="small">
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={() => deleteUrl(url.id)} color="error" size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={showCopied}
        autoHideDuration={2000}
        onClose={() => setShowCopied(false)}
        message="Copied to clipboard!"
      />
    </>
  );
};

export default UrlItem;