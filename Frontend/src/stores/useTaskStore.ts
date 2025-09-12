import { create } from "zustand";
import { TaskStatus, type Task, type TaskFormValues } from "../types/types";
import apiClient from "../utils/axios";

interface TaskState {
    status:TaskStatus;
    success: boolean;
    task:Task|null;
    tasks:Task[];
    createTask:(task:TaskFormValues)=>Promise<void>;
    updateTask:(id:number, task:Task)=>Promise<void>;
    getTasks:()=>void;
}

const useTaskStore = create<TaskState>((set)=>({
    status: TaskStatus.Todo,
    success:false,
    task:null,
    tasks:[],
    getTasks:async ()=>{
        await apiClient.get("/tasks").then((response)=>{
            const res = response.data;
            set({tasks:res});
        })
    },
    createTask : (task:TaskFormValues)=>{
        return apiClient.post<Task>("/tasks",task).then((response)=>{
            const result = response.data;
            set({task:result})
            set({success:true})
        }).catch((error)=>{
            set({success:false})
            console.log(error.error)
        })
    },
    updateTask : (id:number,task: Task)=>{
     return apiClient.put<Task>(`/tasks/${id}`,task).then((response)=>{
            const result = response.data;
            set({task:result})
            set({success:true})
        }).catch((error)=>{
            set({success:false})
            console.log(error.error)
        })
    }
}));

export default useTaskStore;
