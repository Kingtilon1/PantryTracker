"use client";
import { Button, Box, Stack, Typography } from "@mui/material";

import "./styles.css";
import { useState, useEffect } from "react";
import Popup from "./Popup";
import Search from "./Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { firestore } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);

  const [newItemName, setNewItemName] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "items"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      const data = doc.data()
      inventoryList.push({
        name: doc.id,
        ...doc.data,
      });
    });
    setInventory(inventoryList);
  };
  // Use useEffect to fetch data on component mount
  useEffect(() => {
    updateInventory();
  }, []);

  const addItems = async(item) => {
    const docRef = doc(collection(firestore, 'items'), item)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity+1})
      
    }else {
      await setDoc(docRef, {quantity: 1})
    }
    await updateInventory()
  }

  const handleDelete = async(item) => {
    const docRef = doc(collection(firestore, 'items'), item)
    const docSnap = await getDoc(docRef)
    
    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      if (quantity === 1){
        await deleteDoc(docRef)

      }
      else {
        await setDoc(docRef, {quantity: quantity-1})
      }
    }
    await updateInventory()
  }

  const handleInputChange = (event) => {
    setNewItemName(event);
  };

  return (
    //Function that takes the data that is sent from the input box and calls state to
    <Box className="box">
      < Search 
      inventory = {inventory}
      setinventory = {setInventory}
      setValues = {handleInputChange}
      setNewItemName = {setNewItemName}
      />
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
          {inventory.map(({name, quantity}) => (
            <Box key={name} className="item-container">
              <Typography variant={"h3"} className="item inter">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h3" className="quantity inter">
                {quantity}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                className="delete-button"
                onClick={() => handleDelete(name)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
