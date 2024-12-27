import axios from 'axios'

import type { AuthData } from '../types/components'

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

interface SigninResponse {
  token: string
  success: string
}

interface SignoutResponse {
  success: string
  message: string
}

const authApi = axios.create({
  baseURL: NEXT_PUBLIC_BACKEND_URL, //'http://10.10.0.72',
  withCredentials: true
})

export const signUp = async (data: AuthData) => {
  const response = await authApi.post('/api/signup', data)

  return response.data
}

export const signIn = async (data: AuthData): Promise<SigninResponse> => {
  const response = await authApi.post('/api/signin', data)

  return response.data
}

export const signOut = async (token: string | null): Promise<SignoutResponse> => {
  authApi.defaults.headers.common.Authorization = `Bearer ${token}`
  const response = await authApi.post('/api/signout')

  return response.data
}
