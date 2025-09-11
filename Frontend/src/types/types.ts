
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
export const RoleType = {
    User:0,
    Admin:1
}
export type RoleType = typeof RoleType[keyof typeof RoleType];
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
    user: User
}