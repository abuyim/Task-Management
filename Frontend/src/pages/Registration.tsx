import { Paper, Box, TextField, Button } from '@mui/material'
import React from 'react'
import type { RegistrationFormValue } from '../types/types';
import { useForm } from 'react-hook-form';

export default function Registration() {
     const {register, handleSubmit, formState:{errors}, watch} = useForm<RegistrationFormValue>()
    const onRegister = async (data:RegistrationFormValue) => {
      console.log(data);
    };
  return (
     <Paper elevation={5} sx={{ width:'40%', minWidth:400, mx:"auto", m:5, p:5, mt:2 }}>
        <Box component="form" onSubmit={handleSubmit(onRegister)} sx={{ display:"flex", flexDirection:"column", gap:3 }}>
            <TextField variant="filled" label="Username" type="text"
                {...register("username",{required:"Username required",
                    minLength:{value:5, message:"Name minimum length should be 5 characters."},
                    maxLength:{value:50, message:"Name maximum length should not exceed 50 characters."},
                })}
                error={!! errors.username}
                helperText={errors.username?.message?.toString()}
            />
            <TextField variant="filled" label="Email" type='email' style={{ height:'40px'  }} 
                {...register("email", 
                { required: "Email is required",
                    pattern:{
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address"
                    },
                    minLength:{
                        value:8,
                        message:"Email must be at least 8 characters"
                    },
                    maxLength:{
                        value:50,
                        message:"Email can not be exceed 50 characters"
                    }
                    })} 
                error={!! errors.email}
                helperText = {errors.email?.message?.toString()}
            />
            <TextField variant="filled" label="Pasword" type='password' {...register("password",{required:"Password is required",
                minLength:{ value:8, message:"Password minimum length should be 8 characters"},
                maxLength:{ value:30,message:"Password length should not be exceed 30 characters"},
                pattern: { value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/,
                    message: "Must contain uppercase, lowercase, number, and special char",
                }
            })}
            error={ !!errors.password }
            helperText = {errors.password?.message?.toString()}
            />
            <TextField variant="filled" label="Confirm Pasword" type='password' {...register("confirmPassword",{required:"Please confirm your password",
                validate: (val)=> val===watch("password") || "Password not matched."},
            )}
            error={ !!errors.confirmPassword }
            helperText = {errors.confirmPassword?.message?.toString()}
            />
            <Button variant='contained' type='submit'>Register</Button>
        </Box>
          
    </Paper>
  )
}
