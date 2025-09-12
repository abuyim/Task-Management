import React from 'react'
import { Box, Button, Paper, Typography } from '@mui/material';
import TaskCard from './TaskCard';
import { AddCircle } from '@mui/icons-material';
import { TaskStatus, type Task } from '../../types/types';

interface TaskItemProps {
    tasks: Task[];
    status:TaskStatus;
    title: string;
    onStatusChange: (taskId: number, newStatus: TaskStatus)=>void;
    onAssigneeChange: (taskId: number, newAssignee:number)=>void;
    onOpen: ()=>void;
}
export default function TaskItem({tasks,status, title,onStatusChange, onAssigneeChange, onOpen}:TaskItemProps) {
    const filteredTasks = tasks.filter(s=>s.status==status);
   
      return (
      <Paper elevation={5} sx={{ width: "30%", display:'flex', justifyContent:"space-between", flexDirection:"column"}} >
            <Box><Typography marginTop={3} variant='h6'> {title} </Typography>
            {filteredTasks.map(task=><TaskCard key={task.id} task={task} onStatusChange={onStatusChange} onAssigneeChange={onAssigneeChange} />)}
            </Box>
            {status === TaskStatus.Todo && (
                <Box display="flex" justifyContent="flex-end" alignItems="center" my={2} mx={1}>
                <Button size='large' onClick={onOpen} startIcon={<AddCircle />}></Button>
            </Box>)}
    </Paper>
      )
}
