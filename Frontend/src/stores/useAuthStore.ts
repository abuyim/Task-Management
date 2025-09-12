import {create} from 'zustand'
import type { AuthResponse, DecodedToken, LoginFormValue, RegistrationFormValue, User } from '../types/types';
import apiClient from '../utils/axios';
import { getDecodeToken, isLoggedIn } from '../helpers/helper.functions';

interface AuthState {
     errorMsg: string;
    successMsg: string;
    token:string|null;
    user : User |null;
    success: boolean,
    users: User[],
    userRole: string;
    registerUser:(user:RegistrationFormValue)=>Promise<void>,
    login:(data:LoginFormValue)=>Promise<void>;
    setUser:(user:User)=>void;
    setToken:(token:string)=>void;
    validateToken:()=>void
    getUsers:()=>void;
    isLoggedIn:boolean;
}
const useAuthStore = create<AuthState>((set)=>({
     errorMsg:'',
    successMsg:'',
    token:null,
    users:[],
    userRole:'',
    isLoggedIn:false,
    user:null,
    success:false,
    registerUser:(data:RegistrationFormValue)=>{
        return apiClient.post<AuthResponse>("/users",data).then((response)=>{
            const result = response.data;
            if(result.success)
            {
                 const role = getDecodeToken(result.token)?.role;
                set({userRole:role})
                set({token:result.token});
                set({user:result.user});
                set({success:true});
                set({isLoggedIn:isLoggedIn()});
                localStorage.setItem('token',result.token);
                set({successMsg:result.message})
            }
            else{
                set({success:false})
                set({errorMsg:result.message})
            }
        }).catch((error)=>{
            set({success:false});
            set({errorMsg:error.error});
        });
    },
    getUsers:()=>{
        apiClient.get('/users').then((response)=>{
            set({users:response.data})
        })
    },
    login:(data:LoginFormValue)=> {
        localStorage.removeItem('token');
        return apiClient.post<AuthResponse>("/auth",data).then((response)=>{
            const result = response.data
            debugger;
            if(result.success)
            {
                const role = getDecodeToken(result.token)?.role;
                set({userRole:role})
                set({token:result.token});
                set({user:result.user});
                set({success:true});
                set({isLoggedIn:isLoggedIn()});
                localStorage.setItem('token',result.token);
                set({successMsg:result.message})
            }
            else{
                set({success:false})
                set({errorMsg:result.message})
            }
        }).catch((error)=>{
            set({success:false});
            set({errorMsg:error.error})
        });
    },
    validateToken:()=>{
        set({isLoggedIn:isLoggedIn()});
    },
    setToken:(token:string)=>set({token}),
    setUser:(user:User)=>set({user}),

}))
export default useAuthStore;

