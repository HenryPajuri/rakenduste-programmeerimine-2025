const express = require('express')

  const app = express()
  const PORT = 3001

  app.use(express.json())

  app.get('/', (req, res) => {
    res.json({ message: 'Express.js server is running!' })
  })

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })

  module.exports = app