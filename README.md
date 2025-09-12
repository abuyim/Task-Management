# Task Management Application

## Overview
This is a simple **Task Management Application** with **role-based access control**.  
It provides authentication and authorization features, allowing different actions for **Admin** and **User** roles.  

## Features
- Any User can register
- User authentication (login required)  
- Role-based access control:
  - **Admin**: Full access, including task deletion  
  - **User**: Create, update, and view tasks (cannot delete)  
- Secure password handling  

## Default Credentials
- **Username:** `admin`  
- **Password:** `test123`  

## Roles
### Admin
- Create tasks  
- Update tasks  
- View tasks  
- Delete tasks  

### User
- Create tasks  
- Update tasks  
- View tasks  
- ❌ Delete tasks  

## Tech Stack
- **Backend:** ASP Core .Net 9.0  
- **Frontend:** React 
- **Database:** MSSQL

## Default admin User
- created while migrate database (Add-Migration, Update-Database)
username = admin
password = test123
