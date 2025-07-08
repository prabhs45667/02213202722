import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import UrlItem from './UrlItem';

const UrlList: React.FC = () => {
  const { filteredUrls, urls } = useAppContext();

  const handleExport = () => {
    const dataStr = JSON.stringify(urls, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `urls_export_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    document.body.appendChild(linkElement); // Ensure the link is in the DOM
    linkElement.click();
    document.body.removeChild(linkElement); // Clean up
  };

  if (urls.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">
          No URLs shortened yet. Start by adding one above!
        </Typography>
      </Box>
    );
  }

  if (filteredUrls.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">
          No URLs match your search.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Your URLs ({filteredUrls.length})
        </Typography>
        {urls.length > 0 && (
          <Button variant="outlined" size="small" onClick={handleExport}>
            Export All
          </Button>
        )}
      </Box>
      {filteredUrls.map((url) => (
        <UrlItem key={url.id} url={url} />
      ))}
    </Box>
  );
};

export default UrlList;