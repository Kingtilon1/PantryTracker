"use client";
import { Button, Box, Stack, Typography } from "@mui/material";

import "./styles.css";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import Popup from "./Popup";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Home() {
  const [item, setItems] = useState([
    { name: "tomato", quantity: 10 },
    { name: "potato", quantity: 20 },
    { name: "cucumber", quantity: 15 },
    { name: "lettuce", quantity: 8 },
    { name: "cheese", quantity: 5 },
    { name: "carrot", quantity: 12 },
  ]);

  const [newItemName, setNewItemName] = useState("");

  const addItems = () => {
    const trimmedName = newItemName.trim(); 
  
    if (trimmedName !== "") {
      setItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
          (item) => item.name.toLowerCase() === trimmedName.toLowerCase()
        );
        if (existingItemIndex !== -1) {
          return prevItems.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevItems, { name: trimmedName, quantity: 1 }];
        }
      });
      setNewItemName(""); // Clear the input field
    }
  };

  const handleInputChange = (event) => {
    setNewItemName(event);
  };

  return (
    //Function that takes the data that is sent from the input box and calls state to
    <Box className="box">
      <Popup
        values={newItemName}
        addItems={addItems}
        setValues={handleInputChange}
      />
      <Box className="wrapper">
        <Box className="pantry">
          <Typography
            variant="h2"
            color={"#333"}
            textAlign={"center"}
            className="inter"
          >
            Pantry Items
          </Typography>
        </Box>

        <Stack className="inside-stack" spacing={2}>
          {item.map((i) => (
            <Box key={i.name} className="item-container">
              <Typography variant={"h3"} className="item inter">
                {i.name.charAt(0).toUpperCase() + i.name.slice(1)}
              </Typography>
              <Typography variant="h3" className="quantity inter">
                {i.quantity}
              </Typography>
              <Button variant="outlined" startIcon={<DeleteIcon />} className="delete-button">
                Delete
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
