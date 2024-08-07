import React from 'react';
import { Box, TextField } from '@mui/material';

export default function  Search({ searchTerm, setSearchTerm }){
    return (
        <Box sx={{ margin: '20px 0' }}>
            <TextField
                fullWidth
                label="Search items"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Box>
    );
};

