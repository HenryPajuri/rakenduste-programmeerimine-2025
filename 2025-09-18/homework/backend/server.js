const express = require('express')

const app = express()
const PORT = 3001

app.use(express.json())

const users = [
  { id: 1, name: 'Henry Pajuri', email: 'henry@example.com' },
  { id: 2, name: 'John Smith', email: 'john@example.com' },
  { id: 3, name: 'Bob Ross', email: 'bob@example.com' }
]

const books = [
  { id: 1, userId: 1, title: 'React', author: 'Author1', year: 2022 },
  { id: 2, userId: 1, title: 'JavaScript', author: 'Author2', year: 2023 },
  { id: 3, userId: 2, title: 'TypeScript', author: 'Author3', year: 2024 },
]

const flights = [
  { id: 1, from: 'TLL', to: 'HEL', price: 150, airline: 'Estonian Air', duration: '1h 30m' },
  { id: 2, from: 'HEL', to: 'STO', price: 200, airline: 'Lufthansa', duration: '1h 45m' },
  { id: 3, from: 'TLL', to: 'RIX', price: 100, airline: 'airBaltic', duration: '45m' },
]

app.get('/users', (req, res) => {
  res.json(users)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

module.exports = app