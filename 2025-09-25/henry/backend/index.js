const express = require('express')
const app = express()
const port = 3000
const catsRoutes = require("./routes/cats.routes");

app.use(express.json());

app.use("/cats", catsRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
