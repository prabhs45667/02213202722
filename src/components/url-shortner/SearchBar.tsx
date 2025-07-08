import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppContext } from '../../context/AppContext';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useAppContext();

  return (
    <TextField
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search URLs..."
      variant="outlined"
      size="small"
      sx={{ mb: 3 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;