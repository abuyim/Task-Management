import {create} from 'zustand'
import type { AuthResponse, LoginFormValue, RegistrationFormValue, User } from '../types/types';
import apiClient from '../utils/axios';

interface AuthState {
    token:string|null;
    user : User |null;
    success: boolean,
    users: User[],
    registerUser:(user:RegistrationFormValue)=>Promise<void>,
    login:(data:LoginFormValue)=>void;
    setUser:(user:User)=>void;
    setToken:(token:string)=>void;
}
const useAuthStore = create<AuthState>((set)=>({
    token:null,
    users:[],
    isLoggedIn:false,
    user:null,
    success:false,
    registerUser:(data:RegistrationFormValue)=>{
        return apiClient.post<AuthResponse>("/users",data).then((response)=>{
            const result = response.data;
            set({token:result.token});
            set({user:result.user});
            set({success:true});
            localStorage.setItem('token',result.token);
            localStorage.setItem('user',JSON.stringify(result.user));
  
    }).catch((error)=>{
        set({success:false});
        console.log(error.error)
    });
    },
    login:(data:LoginFormValue)=> {
        localStorage.removeItem('token');
        apiClient.post<AuthResponse>("/auth",data).then((response)=>{
            const result = response.data
            set({token:result.token});
            set({user:result.user});
            set({success:true});
            localStorage.setItem('token',result.token);
            localStorage.setItem('user',JSON.stringify(result.user));

        }).catch((error)=>{
            console.log(error.error)
            set({success:false});
        });
    },
    setToken:(token:string)=>set({token}),
    setUser:(user:User)=>set({user}),
}))
export default useAuthStore;