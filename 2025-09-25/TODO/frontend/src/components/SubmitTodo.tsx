import {
  Button,
  Stack,
  TextField,
  Paper,
} from "@mui/material";
import React, { useState } from "react";

type SubmitTodoProps = {
  fetchTodos: () => void;
  showSnackbar: (message: string, severity: "success" | "error") => void;
};

const SubmitTodo = ({ fetchTodos, showSnackbar }: SubmitTodoProps) => {
  const [title, setTitle] = useState("");

  const submitTodo = async () => {
    try {
      const response = await fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        setTitle("");
        fetchTodos();
      } else {
        const errorData = await response.json();
        showSnackbar(
          errorData.errors?.[0]?.msg || "Failed to add todo",
          "error"
        );
      }
    } catch (error) {
      showSnackbar("Error adding todo", "error");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitTodo();
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Todo title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            fullWidth
            required
          />
          <Button variant="contained" color="success" type="submit">
            Add Todo
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default SubmitTodo;
