import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Container
} from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import '../styles/Layout.css'

function Layout() {
  const drawer = (
    <Box className="drawer-content">
      <Typography variant="h6" className="drawer-title">
        My App
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" className="drawer-button">
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/profile" className="drawer-button">
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/about" className="drawer-button">
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box className="layout-main">
      <AppBar position="fixed" className="app-bar">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            My App
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" className="drawer-permanent">
        {drawer}
      </Drawer>

      <Box component="main" className="main-content-area">
        <Toolbar />
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}

export default Layout