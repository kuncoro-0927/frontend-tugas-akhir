import React from "react";
import { IconButton, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => {
  const isOne = quantity === 1;

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onDecrease();
        }}
        sx={{
          backgroundColor: isOne ? "white" : "white",

          width: 10,
          height: 10,
          "&:hover": {
            text: isOne ? "#f0f0f0" : "#333",
          },
        }}
      >
        <RemoveIcon
          sx={{ color: isOne ? "black" : "black", fontSize: "16px" }}
        />
      </IconButton>

      <Typography>{quantity}</Typography>

      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onIncrease();
        }}
        sx={{
          backgroundColor: "white",

          width: 10,
          height: 10,
          "&:hover": {
            text: "#333",
          },
        }}
      >
        <AddIcon sx={{ color: "black", fontSize: "16px" }} />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
