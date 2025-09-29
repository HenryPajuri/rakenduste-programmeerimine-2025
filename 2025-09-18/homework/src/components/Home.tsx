import { useState } from 'react'
import { Button } from '@mui/material'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome to the Home page!</p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </Button>
    </div>
  )
}

export default Home