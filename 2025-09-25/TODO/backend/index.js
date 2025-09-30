const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
const todosRoutes = require("./routes/todos.routes");
const adminRoutes = require("./routes/admin.routes");

app.use(cors());
app.use(express.json());

app.use("/todos", todosRoutes);
app.use("/admin", adminRoutes);
app.get('/', (req, res) => {
  res.send(`
    <h1>TODO API</h1>
    <h2>Available Endpoints:</h2>
    <ul>
      <li><a href="/todos">/todos</a> - TODO CRUD operations</li>
      <li><a href="/admin/todos">/admin/todos</a> - Admin panel (view all todos including deleted)</li>
    </ul>
  `)
})

app.listen(port, () => {
  console.log(`TODO API listening on port ${port}`)
})
