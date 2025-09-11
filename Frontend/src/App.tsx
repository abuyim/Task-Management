import { useState } from 'react'
import './App.css'
import { Paper, Box, Tabs, Tab } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import Registration from './pages/Registration'
import Login from './pages/Login'

function App() {
  const [tab, setTab] = useState<number>(0);

  return (
    <BrowserRouter>
      <Paper elevation={4} sx={{ mx:"auto", minWidth:420, p:2, mt:2, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
        <Box>
          <Tabs value={tab} onChange={(_,value)=>setTab(value)} variant='scrollable'>
            <Tab label="Login"/>
            <Tab label="Register"/>
          </Tabs>
          {tab===0 &&  <Login/>}
          {tab===1 && <Registration/>}
        </Box>
      </Paper>
    </BrowserRouter>
  )
}

export default App
