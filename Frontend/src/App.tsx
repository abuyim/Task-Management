import { useEffect, useState } from 'react'
import './App.css'
import { Paper, Box, Tabs, Tab, Typography, IconButton } from '@mui/material'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import Registration from './pages/Registration'
import Login from './pages/Login'
import useAuthStore from './stores/useAuthStore'
import TaskBoard from './pages/tasks/TaskBoard'
import { Logout } from '@mui/icons-material'

function App() {
  const [tab, setTab] = useState<number>(0);
  const {isLoggedIn, validateToken} = useAuthStore();
 
  useEffect(()=>{
    validateToken()
  },[])

  return (
    <BrowserRouter>
      <Paper elevation={4} sx={{ mx:"auto", minWidth:420, p:2, mt:2, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
        {!isLoggedIn && <Box>
          <Tabs value={tab} onChange={(_,value)=>setTab(value)} variant='scrollable'>
            <Tab label="Login"/>
            <Tab label="Register"/>
          </Tabs>
          {tab===0 &&  <Login/>}
          {tab===1 && <Registration/>}
        </Box>
      }
        {isLoggedIn && 
          <Box sx={{ width:"100%", backgroundColor:'#d5dfbeff' }}>
          
          <TaskBoard/>
          </Box>
          }
      </Paper>
    </BrowserRouter>
  )
}

export default App
