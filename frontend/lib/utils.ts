import axios from "axios"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function apiPost<T>(url: string, tokenRequired:boolean, payload: T ) {
  let token = null
  let headers:Record<string, string> = { 'Content-Type': 'application/json'}
  if(tokenRequired){
    token = localStorage.getItem('token')
    headers['Authorization'] = `Bearer ${token}`
  }
  try {
    const res = await axios.post(url, payload, {headers})
    return res.data;
  } catch(e) {
    throw e;
  }

}

export async function apiGet(url: string, tokenRequired:boolean) {
  let token = null
  let headers:Record<string, string> = { 'Content-Type': 'application/json'}
  if(tokenRequired){
    token = localStorage.getItem('token')
    headers['Authorization'] = `Bearer ${token}`
  }
  try {
    const res = await axios.get(url, {headers})
    return res.data;
  } catch(e) {
    throw e;
  }

}

export async function apiPatch<T>(url: string, tokenRequired:boolean, payload: T) {
  let token = null
  let headers:Record<string, string> = { 'Content-Type': 'application/json'}
  if(tokenRequired){
    token = localStorage.getItem('token')
    headers['Authorization'] = `Bearer ${token}`
  }
  try {
    const res = await axios.patch(url, payload, {headers})
    return res.data;
  } catch(e) {
    throw e;
  }

}

export async function apiDelete(url:string, tokenRequired: boolean) {

  let token = null;
  let headers: Record<string, string> = {'Content-Type': "application/json"}
  try {
    token = localStorage.getItem('token')
    headers['Authorization'] = `Bearer ${token}`
    const res = await axios.delete(url, {headers} )
  } catch (error) {
    throw error
  }
}


export function validatePassword(password: string) {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (password.length > 20) {
    return "Password cannot exceed 20 characters.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  if (!/\d/.test(password)) {
    return "Password must contain at least one digit.";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character.";
  }

  return null;
}

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Invalid email address.";
  }

  return null;
}

export function validateName(name: string) {
  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) {
    return "Invalid name. Please use only letters and spaces.";
  }

  return null;
}


