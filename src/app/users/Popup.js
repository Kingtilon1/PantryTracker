"use client";

import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

export default function Popup(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    props.addItems(props.values) // Calls the addItem function with the current input value
    props.setValues('')
    console.log("hey", props.values)
    handleClose()
  }

  return (
    <div>
      <Button
        sx={{ mb: 1 }}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Add Items
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md" 
        fullWidth={true}
        PaperProps={{
          style: {
            minHeight: '80vh', 
            maxHeight: '90vh', 
            padding: '20px',
          },
        }}
      >
        <DialogTitle>{"Add Item"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              value={props.values}
              placeholder="Enter item"
              onChange={(e) => props.setValues(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '100%', padding: '10px 0', backgroundColor: '#6a11cb', '&:hover': { backgroundColor: '#2575fc' } }}
            >
              Add
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
