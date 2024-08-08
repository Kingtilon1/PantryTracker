import React from 'react';
import { Box, TextField } from '@mui/material';

export default function  Search({ newItemName, setNewItemName }){
    return (
        <Box sx={{ margin: '20px 0' }}>
            <TextField
                fullWidth
                label="Search items"
                variant="outlined"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Box>
    );
};

