import type { NextApiRequest, NextApiResponse } from 'next'
import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

import type {
  RegisterVaxxedPeopleData,
  RegisterVaccineData,
  DefaultDeleteData,
  AccountDetailsData
} from '../types/components'
import type {
  ProfileApiData,
  LengthAwarePaginatorVaccine,
  LengthAwarePaginatorVaxxedPeople,
  VaxxedPeopleApiData,
  VaccineApiData
} from '../types/api'

const backApi = axios.create({
  baseURL: NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true
})

interface Headers {
  headers: AxiosRequestConfig['headers']
}

const apiHeaders = (jwtToken: string): Headers => {
  return {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json'
    }
  }
}

export const getUserProfile = async (tokenJwt: string): Promise<any | ProfileApiData> => {
  try {
    const response = await backApi.get('/api/getProfile', apiHeaders(tokenJwt))

    const userProfile: ProfileApiData = {
      ...response.data.user
    }

    return userProfile
  } catch (error) {
    console.error(error)
    throw new Error('Error trying to get user profile')
  }
}

export const updateUserProfile = async (data: ProfileApiData, tokenJwt: string): Promise<any> => {
  try {
    const response = await backApi.put('/api/updateProfile', data, apiHeaders(tokenJwt))

    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error trying to update user profile.')
  }
}

export const deleteUserProfile = async (tokenJwt: string): Promise<any> => {
  try {
    const response = await backApi.delete('/api/deleteProfile', apiHeaders(tokenJwt))

    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error trying to delete user profile.')
  }
}

export const registerVaccine = async (data: VaccineApiData, tokenJwt: string): Promise<any> => {
  try {
    const response = await backApi.post('/api/registerVaccine', data, apiHeaders(tokenJwt))

    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error trying to register vaccine(s).')
  }
}

export const getVaccines = async (tokenJwt: string, page?: number): Promise<any | LengthAwarePaginatorVaccine> => {
  try {
    const response = page
      ? await backApi.get(`/api/getVaccines?page=${page}`, apiHeaders(tokenJwt))
      : await backApi.get('/api/getVaccines', apiHeaders(tokenJwt))

    const vaccines: LengthAwarePaginatorVaccine = {
      current_page: response.data.data.current_page,
      last_page: response.data.data.last_page,
      per_page: response.data.data.per_page,
      total: response.data.data.total,
      data: response.data.data.data
    }

    return vaccines
  } catch (error) {
    console.error(error)
    throw new Error('Error trying to get vaccines')
  }
}

export const deleteVaccines = async (apiData: DefaultDeleteData, tokenJwt: string): Promise<any> => {
  try {
    const response = await backApi.delete('/api/deleteVaccines', {
      params: apiData,
      headers: apiHeaders(tokenJwt).headers
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error trying to delete vaccine(s).')
  }
}

export const registerVaxedPerson = async (data: VaxxedPeopleApiData, tokenJwt: string): Promise<any> => {
  try {
    const response = await backApi.post('/api/registerVaxxedPerson', data, apiHeaders(tokenJwt))

    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error trying to register vaxxed people.')
  }
}

export const getVaxxedPeople = async (
  tokenJwt: string,
  page?: number
): Promise<any | LengthAwarePaginatorVaxxedPeople> => {
  try {
    const response = page
      ? await backApi.get(`/api/getVaxxedPeople?page=${page}`, apiHeaders(tokenJwt))
      : await backApi.get('/api/getVaxxedPeople', apiHeaders(tokenJwt))

    const vaxxedPeople: LengthAwarePaginatorVaxxedPeople = {
      current_page: response.data.data.current_page,
      last_page: response.data.data.last_page,
      per_page: response.data.data.per_page,
      total: response.data.data.total,
      data: response.data.data.data
    }

    return vaxxedPeople
  } catch (error) {
    console.error(error)
    throw new Error('Error trying to get vaxxed people')
  }
}

export const deleteVaxxedPeople = async (apiData: DefaultDeleteData, tokenJwt: string): Promise<any> => {
  try {
    const response = await backApi.delete('/api/deleteVaxxedPeople', {
      params: apiData,
      headers: apiHeaders(tokenJwt).headers
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error trying to delete vaxxed people.')
  }
}

export const getReportingProgress = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders()

    const backendSSEUrl = `${NEXT_PUBLIC_BACKEND_URL}/report/progress`

    const eventSource = new EventSource(backendSSEUrl)

    eventSource.onmessage = event => {
      res.write(`data: ${event.data}\n\n`)
    }

    eventSource.onerror = error => {
      console.error('Erro no SSE:', error)
      res.write('data: {"error": "Failed to fetch progress"}\n\n')
      res.end()
    }

    req.on('close', () => {
      eventSource.close()
      res.end()
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error in SSE API' })
  }
}
