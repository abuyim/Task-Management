import React from 'react'
import { Save, Close } from '@mui/icons-material';
import { DialogTitle, DialogContent, TextField, DialogActions, Button, Dialog } from '@mui/material';
import { useForm } from 'react-hook-form';
import type { Task } from '../../types/types';

interface AddTaskProps{
    open:boolean;
    title:string;
    task:Task|undefined;
    onSave: (id:number, task:Task) =>void;
    handleClose:() =>void 
}

export default function AddTask({open,title,task, onSave,handleClose} :AddTaskProps) {
    //  const [open, setOpen] = useState<boolean>(false);

    const {register,handleSubmit, formState:{errors}, reset} =  useForm<Task>()

    const handleSave = (newTask:Task) =>{
        onSave(task==undefined? 0 :task.id, newTask);
        reset();
        handleClose();
    }
  return (
     <Dialog open={open} onClose={handleClose}   sx = {{"& .MuiDialog-container": {
        "& .MuiPaper-root": {
          width: "100%",
          height:"60%",
          maxWidth: "500px",  
          marginTop:-5
        },
      },
          }}>
     <DialogTitle>{title}</DialogTitle>
        <form onSubmit={handleSubmit(handleSave)} >
            <DialogContent sx={{ display:"flex", flexDirection:"column", gap:3 }}>
                <TextField sx={{ mt:2 }} defaultValue={task?.title} type='text' label="Title" {...register("title", {required:"Title is required"})} 
                 error={!! errors.title}
                    helperText= { errors.title?.message?.toString()}
                    />
                    <TextField type='text' label="Decription" {...register("description", {required:"Description is required"})} 
                    defaultValue={task?.description}
                    error={!! errors.description}
                    helperText= { errors.description?.message?.toString()}
                    multiline
                    rows={3}
                    />
                </DialogContent>
                <DialogActions>
                    <Button startIcon={<Save/>} type='submit' >{task ? `Update`:`Save` }</Button>
                    <Button startIcon={<Close/>} onClick={handleClose} >Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
  )
}
