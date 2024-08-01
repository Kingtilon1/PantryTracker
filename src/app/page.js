"use client";
import {
  Button,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import "./styles.css";

const item = ["tomato", "potato", "cucumber", "lettuce", "cheese", "carrot"];
export default function Home() {
  return (
      <Box className="box">
        <Box className = "wrapper">
          <Box className="pantry">
            <Typography variant="h2" color = {'#333'} textAlign={'center'}>
              Pantry Items
            </Typography>
          </Box>

          <Stack className="inside-stack" spacing={2}>
            {item.map((i) => (
              <Box key={i} className="item-container">
                <Typography variant={"h3"} className="item">
                  {i.charAt(0).toUpperCase() + i.slice(1)}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

  );
}
