import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import '../styles/Layout.css'

function Layout() {
  return (
    <div className="layout-container">
      <AppBar position="static">
        <Toolbar className="navbar">
          <Typography variant="h6" component="div" className="app-title">
            My App
          </Typography>
          <div className="nav-buttons">
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/something">
              Something
            </Button>
            <Button color="inherit" component={Link} to="/about">
              About
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <main className="main-content">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout