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

type Todo = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

type EditTodoProps = {
  todo: Todo;
  onClose: () => void;
  fetchTodos: () => void;
  showSnackbar: (message: string, severity: "success" | "error") => void;
};

const EditTodo = ({ todo, onClose, fetchTodos, showSnackbar }: EditTodoProps) => {
  const [title, setTitle] = useState(todo.title);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        showSnackbar("Todo updated successfully", "success");
        fetchTodos();
        onClose();
      } else {
        const errorData = await response.json();
        showSnackbar(
          errorData.errors?.[0]?.msg || "Failed to update todo",
          "error"
        );
      }
    } catch (error) {
      showSnackbar("Error updating todo", "error");
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Todo</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Todo title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
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

export default EditTodo;
