import {create} from 'zustand'
import type { AuthResponse, LoginFormValue, RegistrationFormValue, User } from '../types/types';
import apiClient from '../utils/axios';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
    token:string|null;
    user : User |null;
    success: boolean,
    users: User[],
    registerUser:(user:RegistrationFormValue)=>Promise<void>,
    login:(data:LoginFormValue)=>void;
    setUser:(user:User)=>void;
    setToken:(token:string)=>void;
    validateToken:()=>void
    getUsers:()=>void;
    isLoggedIn:boolean;
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
            set({isLoggedIn:isLoggedIn()});
            localStorage.setItem('token',result.token);
            localStorage.setItem('user',JSON.stringify(result.user));
  
    }).catch((error)=>{
        set({success:false});
        console.log(error.error)
    });
    },
    getUsers:()=>{
        apiClient.get('/users').then((response)=>{
            set({users:response.data})
        })
    },
    login:(data:LoginFormValue)=> {
        localStorage.removeItem('token');
        apiClient.post<AuthResponse>("/auth",data).then((response)=>{
            const result = response.data
            set({token:result.token});
            set({user:result.user});
            set({success:true});
            set({isLoggedIn:isLoggedIn()});
            localStorage.setItem('token',result.token);
            localStorage.setItem('user',JSON.stringify(result.user));

        }).catch((error)=>{
            console.log(error.error)
            set({success:false});
        });
    },
    validateToken:()=>{
        set({isLoggedIn:isLoggedIn()});
    },
    setToken:(token:string)=>set({token}),
    setUser:(user:User)=>set({user}),
}))
export default useAuthStore;

function isLoggedIn(): boolean | undefined {
    var token = localStorage.getItem('token');
    if(!token)
        return false;
const {exp } = jwtDecode(token)??0;
if(!exp) return false;
const hoursLeft = (exp *1000 - Date.now())/(1000 * 60 *60)
return hoursLeft >0
}
