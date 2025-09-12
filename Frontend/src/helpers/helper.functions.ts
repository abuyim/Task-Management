import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../types/types";

export function isLoggedIn(): boolean | undefined {
    var token = localStorage.getItem('token');
    if(!token)
        return false;
const {exp } = jwtDecode(token)??0;
if(!exp) return false;
const hoursLeft = (exp *1000 - Date.now())/(1000 * 60 *60)
return hoursLeft >0
}

export function getDecodeToken(t:string =''): DecodedToken | null {
  let token = t;
  if(token==='')
    token = localStorage.getItem('token')??'';
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}