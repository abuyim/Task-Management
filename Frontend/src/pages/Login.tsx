import { Paper, Box, TextField, Button } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import type { LoginFormValue } from '../types/types';

export default function Login() {
    
    const {register, handleSubmit,formState:{errors}} = useForm<LoginFormValue>();
    const onLogin = (data:LoginFormValue)=>{
        console.log(data);
    }
  return (
   <Paper elevation={5} sx={{ width:'30%',minWidth:400, mx:"auto", m:3, p:5, mt:2 }}>
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
