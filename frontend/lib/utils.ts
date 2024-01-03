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