import { Paper, Box, TextField, Button, Alert } from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { useForm } from 'react-hook-form';
import type { LoginFormValue } from '../types/types';
import useAuthStore from '../stores/useAuthStore';

export default function Login() {
    
    const {register, handleSubmit,formState:{errors}} = useForm<LoginFormValue>();
    const {login, success} = useAuthStore();
    const onLogin = (data:LoginFormValue)=>{
        login(data)
    }
  return (
   <Paper elevation={5} sx={{ width:'30%',minWidth:400, mx:"auto", m:3, p:5, mt:2 }}>
    {success && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            User loggged in successfully.
        </Alert>}   
        <Box component="form" onSubmit={handleSubmit(onLogin)}
        sx={{  display:"flex", flexDirection:"column", gap:2 }}>
            <TextField variant="filled" label="Username" type='string' {...register("userName",{required:"Username is required"})}
            error={!!errors.userName}
            helperText={errors.userName?.message?.toString()}/>
            <TextField variant="filled" label="Pasword" type='password' {...register("password", {required:"Password is required"})}
            error={ !!errors.password }
            helperText = {errors.password?.message?.toString()}
            />
            <Button type='submit' variant='contained'>Login</Button>
        </Box>
    </Paper>
  )
}
