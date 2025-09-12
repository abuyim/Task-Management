import React, { useEffect, useState } from 'react'
import { Alert, Paper,  Stack,} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import useAuthStore from '../../stores/useAuthStore';
import { TaskStatusOptions, type Task, type TaskFormValues, type TaskStatus } from '../../types/types';
import useTaskStore from '../../stores/useTaskStore';
import TaskItem from './TaskItem';
import AddTask from './AddTask';

export default function TaskBoard() {
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const {isLoggedIn,getUsers} = useAuthStore();
    const [message, setMessage] = useState<string>();
      const [visible, setVisible] = useState(true);

    const {success, tasks,getTasks,createTask,updateTask} = useTaskStore();
    const reload = () =>{
        setVisible(true);
        getTasks(); 
        setTimeout(() => {
            setVisible(false);
        }, 3000);
    }
    const handleStatusChange = async (id:number, newStatus:TaskStatus) =>{
        const updatedTask = allTasks.find(t => t.id === id);
        if (!updatedTask) return;
        const newTask = {...updatedTask, status:newStatus};
         try {
            await updateTask(id,newTask);
            setMessage("Task status updated successfully.")
            reload(); 
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }
    const handleAsiigneeChange=async (id:number, newAssignee:number) =>{
        const updatedTask = allTasks.find(t => t.id === id);
        if (!updatedTask) return;
        const newTask = {...updatedTask, assignee:newAssignee};

        try{
            await updateTask(id,newTask);
            setMessage("Task assignee updated successfully.")
            reload();
            }
            catch(error) {
            console.error("Error updating task:", error);
        }
    };
    const [open, setOpen] = useState<boolean>(false);

    const handleSave = (newTask: TaskFormValues) =>{
        createTask(newTask).then(()=>{
            setMessage("Task created successfully.")
            reload();
        });
        setOpen(false)

    }
    const handleOpen= ()=>{
        setOpen(true);
    }
    const handleClose= ()=>{
        setOpen(false);
    }
    
    useEffect(() => {
        getUsers();
        getTasks();
    }, []);
    useEffect(() => {
        setAllTasks(tasks);
    }, [tasks]);
   
   
  return  (<>
     {isLoggedIn && <Paper elevation={1} sx={{ p:5 , m:2, width:"90%"}} >
        {success && visible && <Alert icon={<CheckIcon />} severity='success'>{message}</Alert>}
        <Stack gap={3} direction={'row'} sx={{ minHeight:"500px", mt:2 }}>
            {TaskStatusOptions.map((status)=>
                <TaskItem tasks={allTasks} status={status.value} title={status.label} onStatusChange={handleStatusChange} onAssigneeChange={handleAsiigneeChange} onOpen={handleOpen}></TaskItem>
            )}
        </Stack>
       
           <AddTask open={open} title="Add Task" onSave={handleSave} handleClose={handleClose}/>
      
    </Paper>}</>)
}
