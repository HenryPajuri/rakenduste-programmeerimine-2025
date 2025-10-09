import {
  Box,
  List,
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
import SubmitTodo from "./SubmitTodo.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditTodo from "./EditTodo.tsx";

type Todo = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3001/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      showSnackbar("Failed to fetch todos", "error");
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        showSnackbar("Todo deleted successfully", "success");
        fetchTodos();
      } else {
        showSnackbar("Failed to delete todo", "error");
      }
    } catch (error) {
      showSnackbar("Error deleting todo", "error");
    }
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        TODO Management
      </Typography>
      <Stack spacing={3}>
        <SubmitTodo fetchTodos={fetchTodos} showSnackbar={showSnackbar} />
        <TodosList
          todos={todos}
          onDelete={deleteTodo}
          onEdit={setEditingTodo}
        />
      </Stack>
      {editingTodo && (
        <EditTodo
          todo={editingTodo}
          onClose={() => setEditingTodo(null)}
          fetchTodos={fetchTodos}
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

type TodosListProps = {
  todos: Todo[];
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
};

const TodosList: React.FC<TodosListProps> = ({ todos, onDelete, onEdit }) => {
  return (
    <List>
      {todos.map((todo) => (
        <Card key={todo.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 1 }}>{todo.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              Created: {new Date(todo.createdAt).toLocaleString()}
            </Typography>
            {todo.updatedAt && (
              <Typography variant="body2" color="text.secondary">
                Updated: {new Date(todo.updatedAt).toLocaleString()}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <IconButton
              color="primary"
              onClick={() => onEdit(todo)}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => onDelete(todo.id)}
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

export default Todos;
