import React from 'react'
import { Paper, Typography, Box, FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent } from '@mui/material';
import useAuthStore from '../../stores/useAuthStore';
import { type Task, TaskStatus, TaskStatusOptions } from '../../types/types';

interface TaskItemProps {
    task: Task;
    onStatusChange: (taskId: number, newStatus: TaskStatus)=>void
    onAssigneeChange: (taskId: number, assigneeId: number)=>void
}
export default function TaskCard({task, onStatusChange, onAssigneeChange}:TaskItemProps) {
    const {users} = useAuthStore();
    const status = task.status;
    const handleChange = (event:SelectChangeEvent<TaskStatus>) =>{
        onStatusChange(task.id, event?.target.value)
    }

    const handleUserChange = (event:SelectChangeEvent<number>) =>{
        onAssigneeChange(task.id, event?.target.value)
    }
  return (
        <Paper elevation={3} sx={{ mx:3, my:1, p:3 }} variant='elevation'>
            <Box sx={{ display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:"flex-start"}}>
                <Typography variant='h6' align='left' >{task.title}</Typography>
                <Box>{task.description}</Box>
                    {task.assignee && (
                <Typography variant='caption' sx={{ textAlign: 'left' }}>
                    Assignee: {task.user?.username}
                </Typography>
)}
                <Box sx={{ display:"flex", gap:2, flexDirection:{xs:"column", md:"column", lg:"row"} }}>
                <FormControl  variant='standard' sx={{ mt:1, width:"110px", fontSize:"10px" }}>
                    <InputLabel>Status</InputLabel>
                    <Select name='status' sx={{textAlign:"left", pl:2, fontSize:"12px"  }} value={status} label ="Status" onChange={handleChange}>
                        {TaskStatusOptions.map(t=>
                            <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                 <FormControl variant='standard' sx={{ mt:1, width:"110px", fontSize:"10px" }}>
                    <InputLabel>Assignee</InputLabel>
                    <Select name='assignee' sx={{textAlign:"left", pl:2, fontSize:"12px"  }} value={task.assignee ??""} label ="Assignee" onChange={handleUserChange}>
                        {users.map(u=>
                            <MenuItem key={u.id} value={u.id}>{u.username}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                </Box>

            </Box>
        </Paper>
  )
}
