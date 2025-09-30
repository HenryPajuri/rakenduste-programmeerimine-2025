import {
  Box,
  List,
  ListItem,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SubmitCat from "./SubmitCat.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditCat from "./EditCat.tsx";

type Cat = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Cats = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [editingCat, setEditingCat] = useState<Cat | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const fetchCats = async () => {
    try {
      const response = await fetch("http://localhost:3000/cats");
      const data = await response.json();
      setCats(data);
    } catch (error) {
      showSnackbar("Failed to fetch cats", "error");
    }
  };

  const deleteCat = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/cats/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        showSnackbar("Cat deleted successfully", "success");
        fetchCats();
      } else {
        showSnackbar("Failed to delete cat", "error");
      }
    } catch (error) {
      showSnackbar("Error deleting cat", "error");
    }
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        Cats Management
      </Typography>
      <Stack spacing={3}>
        <SubmitCat fetchCats={fetchCats} showSnackbar={showSnackbar} />
        <CatsList
          cats={cats}
          onDelete={deleteCat}
          onEdit={setEditingCat}
        />
      </Stack>
      {editingCat && (
        <EditCat
          cat={editingCat}
          onClose={() => setEditingCat(null)}
          fetchCats={fetchCats}
          showSnackbar={showSnackbar}
        />
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

type CatsListProps = {
  cats: Cat[];
  onDelete: (id: string) => void;
  onEdit: (cat: Cat) => void;
};

const CatsList: React.FC<CatsListProps> = ({ cats, onDelete, onEdit }) => {
  return (
    <List>
      {cats.map((cat) => (
        <Card key={cat.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5">{cat.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Created: {new Date(cat.createdAt).toLocaleString()}
            </Typography>
            {cat.updatedAt && (
              <Typography variant="body2" color="text.secondary">
                Updated: {new Date(cat.updatedAt).toLocaleString()}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <IconButton
              color="primary"
              onClick={() => onEdit(cat)}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => onDelete(cat.id)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </List>
  );
};

export default Cats;