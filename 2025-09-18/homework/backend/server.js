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

app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  }
  users.push(newUser)
  res.status(201).json(newUser)
})

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const userIndex = users.findIndex(u => u.id === id)
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' })
  }
  users[userIndex] = { id, name: req.body.name, email: req.body.email }
  res.json(users[userIndex])
})

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const userIndex = users.findIndex(u => u.id === id)
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' })
  }
  users.splice(userIndex, 1)
  res.status(204).send()
})

app.get('/books', (req, res) => {
  res.json(books)
})

app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    userId: req.body.userId,
    title: req.body.title,
    author: req.body.author,
    year: req.body.year
  }
  books.push(newBook)
  res.status(201).json(newBook)
})

app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const bookIndex = books.findIndex(b => b.id === id)
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' })
  }
  books[bookIndex] = { id, userId: req.body.userId, title: req.body.title, author: req.body.author, year: req.body.year }
  res.json(books[bookIndex])
})

app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const bookIndex = books.findIndex(b => b.id === id)
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' })
  }
  books.splice(bookIndex, 1)
  res.status(204).send()
})

app.get('/flights', (req, res) => {
  res.json(flights)
})

app.post('/flights', (req, res) => {
  const newFlight = {
    id: flights.length + 1,
    from: req.body.from,
    to: req.body.to,
    price: req.body.price,
    airline: req.body.airline,
    duration: req.body.duration
  }
  flights.push(newFlight)
  res.status(201).json(newFlight)
})

app.put('/flights/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const flightIndex = flights.findIndex(f => f.id === id)
  if (flightIndex === -1) {
    return res.status(404).json({ error: 'Flight not found' })
  }
  flights[flightIndex] = { id, from: req.body.from, to: req.body.to, price: req.body.price, airline: req.body.airline, duration: req.body.duration }
  res.json(flights[flightIndex])
})

app.delete('/flights/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const flightIndex = flights.findIndex(f => f.id === id)
  if (flightIndex === -1) {
    return res.status(404).json({ error: 'Flight not found' })
  }
  flights.splice(flightIndex, 1)
  res.status(204).send()
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

module.exports = app