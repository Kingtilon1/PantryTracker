"use client";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Button,
} from "@mui/material";

import "./styles.css";
import { useState, useEffect } from "react";
import Popup from "./users/Popup";
import Search from "./users/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { firestore } from "../firebase";
import ProtectedRoute from "./users/ProtectedRoute";
import Login from "./users/Login";

import { useUserAuth } from "../context/UserAuthContext";
import {
  collection,
  query,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

export default function Home() {
  const { user, logOut } = useUserAuth();
  const [inventory, setInventory] = useState([]);

  const [newItemName, setNewItemName] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "items"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      const data = doc.data();
      inventoryList.push({
        name: doc.id,
        quantity: data.quantity,
      });
    });
    setInventory(inventoryList);
  };

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
        await deleteDoc(docRef);
     
    }
    // TODO: make it so user can edit each card individually 
    // Create some kind of ai implmentation by either having a llm describe the item in the list 
    //or having a phot upload option where the model recognizes the item and adds it to the list
    await updateInventory();
  };

  const handleInputChange = (event) => {
    setNewItemName(event);
  };
  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(newItemName.toLowerCase())
  );
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };
  if (!user) {
    return <Login />;
  }

  return (
    <ProtectedRoute>
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "linear-gradient(to right, #6a11cb, #2575fc)",
          color: "#fff",
          p: 4,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{ alignSelf: "flex-end", mb: 2 }}
          >
            Logout
          </Button>
        </Box>
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
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          <Search newItemName={newItemName} setNewItemName={setNewItemName} />
          <Popup
            values={newItemName}
            addItems={addItems}
            setValues={handleInputChange}
          />
          <Box
            className="wrapper"
            sx={{ p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}
          >
            <Box
              sx={{
                mb: 4,
                p: 2,
                backgroundColor: "#6a11cb", // Use primary color for background
                borderRadius: 2,
                boxShadow: 3,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                sx={{ color: "#fff", fontWeight: "bold" }}
                gutterBottom
              >
                Pantry Items
              </Typography>
            </Box>

            <Stack className="inside-stack" spacing={2}>
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
                    minHeight: "100px", // Set a fixed height for each item
                    width: "95%", // Ensure it takes the full width available
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
