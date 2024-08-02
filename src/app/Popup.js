"use client"; // Required for Next.js client-side components

import React, { useState } from 'react';
import { Button, Input, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

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
  }

  return (
    <div>
      <Button sx= {{mb:1}}variant="contained" color="primary" onClick={handleClickOpen}>
        Open Popup
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Add Item"}</DialogTitle>
        <DialogContent MuiDialogContent-root className='inputbox'>
          <form onSubmit={handleSubmit}>
            <input 
              value = {props.values}
              className="input" 
              placeholder='Enter item'
              onChange={(e)=> props.setValues(e.target.value)}
            />
            <Button type = "submit" variant = "contained">Add</Button>
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
