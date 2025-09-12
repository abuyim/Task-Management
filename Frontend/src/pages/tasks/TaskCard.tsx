import React, { useEffect, useState } from 'react'
import { Paper, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button, type SelectChangeEvent, IconButton } from '@mui/material';
import useAuthStore from '../../stores/useAuthStore';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { type Task, TaskStatus, TaskStatusOptions } from '../../types/types';
import { getDecodeToken } from '../../helpers/helper.functions';
import useTaskStore from '../../stores/useTaskStore';

interface TaskItemProps {
    task: Task;
    onStatusChange: (taskId: number, newStatus: TaskStatus)=>void
    onAssigneeChange: (taskId: number, assigneeId: number)=>void
    onEditMode:(task:Task)=>void;
}
export default function TaskCard({task, onStatusChange, onAssigneeChange, onEditMode}:TaskItemProps) {
    const {users} = useAuthStore();
    const {deleteTask, getTasks} = useTaskStore();
    const status = task.status;
    const handleChange = (event:SelectChangeEvent<TaskStatus>) =>{
        onStatusChange(task.id, event?.target.value)
    }

    const handleUserChange = (event:SelectChangeEvent<number>) =>{
        onAssigneeChange(task.id, event?.target.value)
    }

    const deleteHandler = async()=>{
        await deleteTask(task.id);
        getTasks();
    }   
    
    const editHandler = ()=>{
        onEditMode(task);
    }
  return (
        <Paper elevation={3} sx={{ mx:1, my:1, p:3 }} variant='elevation'>
            <Box sx={{width:"100%", display:"flex", flexDirection:"column"}}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant='h6' align='left' >{task.title}</Typography>
                    <Box sx={{fontSize:"10px"}}>
                        <IconButton onClick={editHandler} size="small" color='primary'><EditIcon/></IconButton>
                        {getDecodeToken()?.role === "Admin" && <IconButton onClick={deleteHandler} size="small" color="error"><CloseIcon/></IconButton> }
                    </Box>
                </Box>
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
