import { useState } from 'react'
import Todos from './components/Todos'
import Admin from './components/Admin'
import { Container, Tabs, Tab, Box } from '@mui/material'

function App() {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="TODO Management" />
          <Tab label="Admin Panel" />
        </Tabs>
      </Box>
      {activeTab === 0 && <Todos />}
      {activeTab === 1 && <Admin />}
    </Container>
  )
}

export default App
