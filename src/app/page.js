"use client";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";

import "./styles.css";
import { useState, useEffect } from "react";
import Popup from "./Popup";
import Search from "./Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { firestore } from "../firebase";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";

import { useUserAuth } from "../context/UserAuthContext";
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
  const { user } = useUserAuth();
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
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "linear-gradient(to right, #6a11cb, #2575fc)",
          color: "#fff",
          p: 4,
        }}
      >
        <Box
          className="box"
          sx={{
            p: 3,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 2,
            boxShadow: 5,
            maxWidth: 800,
            width: "100%",
            maxHeight: "85vh", 
            overflowX: 'hidden',
            overflowY: 'auto'
          }}
        >
          <Search searchTerm={newItemName} setSearchTerm={setNewItemName} />
          <Popup
            values={newItemName}
            addItems={addItems}
            setValues={handleInputChange}
          />
          <Box
            className="wrapper"
            sx={{ p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}
          >
            <Box className="pantry" sx={{ mb: 2 }}>
              <Typography
                variant="h2"
                color="primary"
                textAlign="center"
                gutterBottom
              >
                Pantry Items
              </Typography>
            </Box>

            <Stack className="inside-stack" spacing={2} >
              {filteredInventory.map(({ name, quantity }) => (
                <Card
                  key={name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    minHeight: '100px', // Set a fixed height for each item
                    width: '95%', // Ensure it takes the full width available
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Quantity: {quantity}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(name)}
                      aria-label={`delete ${name}`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
