import { Box, Button, Stack, TextField, Paper } from "@mui/material";
import React, { useState } from "react";

type SubmitCatProps = {
  fetchCats: () => void;
  showSnackbar: (message: string, severity: "success" | "error") => void;
};

const SubmitCat = ({ fetchCats, showSnackbar }: SubmitCatProps) => {
  const [name, setName] = useState("");

  const submitCat = async () => {
    try {
      const response = await fetch("http://localhost:3000/cats", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      });

      if (response.ok) {
        showSnackbar("Cat added successfully", "success");
        setName("");
        fetchCats();
      } else {
        const errorData = await response.json();
        showSnackbar(
          errorData.errors?.[0]?.msg || "Failed to add cat",
          "error"
        );
      }
    } catch (error) {
      showSnackbar("Error adding cat", "error");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitCat();
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Cat name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
            required
          />
          <Button variant="contained" color="success" type="submit">
            Add Cat
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default SubmitCat;