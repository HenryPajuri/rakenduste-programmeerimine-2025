import { useState } from 'react'
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Container
} from '@mui/material'
import {
  Add,
  Remove,
  Refresh,
} from '@mui/icons-material'
import '../styles/Home.css'

function Home() {
  const [count, setCount] = useState(0)

  const handleIncrement = () => setCount(prev => prev + 1)
  const handleDecrement = () => setCount(prev => prev - 1)
  const handleReset = () => setCount(0)

  return (
    <Container maxWidth="lg" className="home-container">
      <Box className="home-header">
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome Home
        </Typography>
        <Typography variant="h5" color="text.secondary" className="home-subtitle">
          Home text
        </Typography>

   
      </Box>

      <Grid container className="home-grid">
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent className="counter-card-content">
              <Typography variant="h4" component="h2" gutterBottom>
                Interactive Counter
              </Typography>

              <Paper elevation={3} className="counter-display">
                <Typography variant="h2" component="div">
                  {count}
                </Typography>
                <Typography variant="subtitle1">
                  Current Count
                </Typography>
              </Paper>

              <Stack className="counter-buttons">
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<Remove />}
                  onClick={handleDecrement}
                >
                  Decrease
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                  onClick={handleIncrement}
                >
                  Increase
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card className="features-card">
            <CardContent className="features-card-content">
              <Typography variant="h5" component="h2" className="features-title">
                Boxes
              </Typography>

              <Stack className="features-list">
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Box 1
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   Box 1 desc.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h6" gutterBottom>
                   Box 2
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Box 2 desc.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h6" gutterBottom>
                   Box 3
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   Box 3 desc.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h6" gutterBottom>
                 Box 4
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   Box 4 desc.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box className="home-footer">
        <Typography variant="body1" color="text.secondary">
          footer box
        </Typography>
      </Box>
    </Container>
  )
}

export default Home