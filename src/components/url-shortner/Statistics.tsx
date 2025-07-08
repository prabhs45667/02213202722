import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { useAppContext } from '../../context/AppContext';

const Statistics: React.FC = () => {
  const { urls } = useAppContext();

  const totalUrls = urls.length;
  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
  const todayUrls = urls.filter(url => {
    const today = new Date().toDateString();
    const urlDate = new Date(url.createdAt).toDateString();
    return today === urlDate;
  }).length;

  const stats = [
    { label: 'Total URLs', value: totalUrls, color: '#1976d2' },
    { label: 'Total Clicks', value: totalClicks, color: '#388e3c' },
    { label: 'Created Today', value: todayUrls, color: '#f57c00' },
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {stats.map((stat) => (
        <Grid {...{ item: true, xs: 12, sm: 4, key: stat.label }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: stat.color, fontWeight: 'bold' }}>
              {stat.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stat.label}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Statistics;