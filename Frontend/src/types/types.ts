

export const RoleType = {
    User:0,
    Admin:1
}
export type RoleType = typeof RoleType[keyof typeof RoleType];

export const TaskStatus = {
  Todo: 0,
  Inprogress: 1,
  Done: 2
} as const;
export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus]

export type RegistrationFormValue = {
    username:string;
    email:string;
    password: string;
    confirmPassword: string;
}

export type LoginFormValue = {
    userName : string;
    password:string;
}
export interface User {
  id: number;
  username: string;
  email: string;
  role: RoleType;
  createdAt: string;
  updatedAt:string;
  description?:string;
}

export interface AuthResponse{
    token: string;
    expireDuration: string;
    user: User;
    success: boolean;
    message: string;
}

export interface Task {
  id:number;
  title: string;
  description: string;
  status: TaskStatus;
  assignee?:number;
  user?: User;
}


export const TaskStatusOptions  = [
  { value: TaskStatus.Todo, label: 'To Do' },
    { value: TaskStatus.Inprogress, label: 'In Progress' },
    { value: TaskStatus.Done, label: 'Done' }
]

export interface TaskFormValues {
 title:string;
 description:string
}

export interface DecodedToken {
    uniqueName?:string;
    role?:string;
    exp?:number;
}