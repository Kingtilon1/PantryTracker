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
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";

import "./styles.css";
import { useState, useEffect } from "react";
import Popup from "./users/Popup";
import Search from "./users/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit'; 
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
  const [editItem, setEditItem] = useState(null); // State for the item being edited
  const [openEditDialog, setOpenEditDialog] = useState(false); // State to control edit dialog
  const [editName, setEditName] = useState("");
  const [editQuantity, setEditQuantity] = useState("");

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
    // make a plus to add by one and a suibtract to change by one
    await updateInventory();
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setEditName(item.name);
    setEditQuantity(item.quantity);
    setOpenEditDialog(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(collection(firestore, "items"), editItem.name);
    await setDoc(docRef, { quantity: editQuantity });
    if (editName !== editItem.name) {
      const newDocRef = doc(collection(firestore, "items"), editName);
      await setDoc(newDocRef, { quantity: editQuantity });
      await deleteDoc(docRef);
    }
    setOpenEditDialog(false);
    updateInventory();
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
                      color="primary"
                      onClick={() => handleEditClick({name, quantity})}
                      aria-label={`edit ${name}`}
                    >
                      <EditIcon />
                    </IconButton>
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

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Item Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Quantity"
              type="number"
              value={editQuantity}
              onChange={(e) => setEditQuantity(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '100%', padding: '10px 0', backgroundColor: '#6a11cb', '&:hover': { backgroundColor: '#2575fc' } }}
            >
              Save
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </ProtectedRoute>
  );
}
