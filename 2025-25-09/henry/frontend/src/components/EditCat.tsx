import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import React, { useState } from "react";

type Cat = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

type EditCatProps = {
  cat: Cat;
  onClose: () => void;
  fetchCats: () => void;
  showSnackbar: (message: string, severity: "success" | "error") => void;
};

const EditCat = ({ cat, onClose, fetchCats, showSnackbar }: EditCatProps) => {
  const [name, setName] = useState(cat.name);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/cats/${cat.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        showSnackbar("Cat updated successfully", "success");
        fetchCats();
        onClose();
      } else {
        const errorData = await response.json();
        showSnackbar(
          errorData.errors?.[0]?.msg || "Failed to update cat",
          "error"
        );
      }
    } catch (error) {
      showSnackbar("Error updating cat", "error");
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Cat</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Cat name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              fullWidth
              required
              autoFocus
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditCat;
