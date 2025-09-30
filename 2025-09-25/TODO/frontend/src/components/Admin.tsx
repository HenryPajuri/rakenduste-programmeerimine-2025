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
  Chip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteIcon from "@mui/icons-material/Delete";

type Todo = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Admin = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const fetchAllTodos = async () => {
    try {
      const response = await fetch("http://localhost:3001/admin/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      showSnackbar("Failed to fetch todos", "error");
    }
  };

  const toggleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/admin/todos/${id}/toggle-delete`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        showSnackbar("Todo status toggled successfully", "success");
        fetchAllTodos();
      } else {
        showSnackbar("Failed to toggle todo status", "error");
      }
    } catch (error) {
      showSnackbar("Error toggling todo status", "error");
    }
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        Admin Panel
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Manage all todos including deleted ones
      </Typography>
      <AdminTodosList todos={todos} onToggleDelete={toggleDelete} />
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

type AdminTodosListProps = {
  todos: Todo[];
  onToggleDelete: (id: string) => void;
};

const AdminTodosList: React.FC<AdminTodosListProps> = ({
  todos,
  onToggleDelete,
}) => {
  return (
    <List>
      {todos.map((todo) => (
        <Card
          key={todo.id}
          sx={{
            mb: 2,
            opacity: todo.deleted ? 0.6 : 1,
            border: todo.deleted ? "2px solid #f44336" : "none",
          }}
        >
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="h5">{todo.title}</Typography>
              {todo.deleted && (
                <Chip label="DELETED" color="error" size="small" />
              )}
            </Stack>
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
              color={todo.deleted ? "success" : "error"}
              onClick={() => onToggleDelete(todo.id)}
              aria-label={todo.deleted ? "restore" : "delete"}
            >
              {todo.deleted ? <RestoreIcon /> : <DeleteIcon />}
            </IconButton>
            <Typography variant="caption" color="text.secondary">
              {todo.deleted ? "Restore" : "Mark as deleted"}
            </Typography>
          </CardActions>
        </Card>
      ))}
    </List>
  );
};

export default Admin;
