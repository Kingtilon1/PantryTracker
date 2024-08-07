"use client";
import { Button, Box, Stack, Typography } from "@mui/material";

import "./styles.css";
import { useState, useEffect } from "react";
import Popup from "./Popup";
import Search from "./Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { firestore } from "../firebase";
import ProtectedRoute from "./ProtectedRoute";
import Login from './Login';

import {useUserAuth } from "../context/UserAuthContext";
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
  const {user} = useUserAuth()
  const [inventory, setInventory] = useState([]);

  const [newItemName, setNewItemName] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "items"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
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

  const addItems = async (item) => {
    const docRef = doc(collection(firestore, "items"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const handleDelete = async (item) => {
    const docRef = doc(collection(firestore, "items"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  const handleInputChange = (event) => {
    setNewItemName(event);
  };
  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(newItemName.toLowerCase())
  );
  if (!user) {
    return <Login />;
  }

  return (
      <ProtectedRoute>
        <Box className="box">
          <Search searchTerm={newItemName} setSearchTerm={setNewItemName} />
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
              {filteredInventory.map(({ name, quantity }) => (
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
      </ProtectedRoute>
  );
}
