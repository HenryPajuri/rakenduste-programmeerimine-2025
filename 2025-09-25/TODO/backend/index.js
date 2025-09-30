const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
const todosRoutes = require("./routes/todos.routes");

app.use(cors());
app.use(express.json());

app.use("/todos", todosRoutes);
app.get('/', (req, res) => {
  res.send('TODO API')
})

app.listen(port, () => {
  console.log(`TODO API listening on port ${port}`)
})
