'use client'

import type { ReactNode } from 'react'
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

import { toast } from 'react-toastify'

import * as dashboardApi from '../services/DashboardApi'
import { AuthContext } from './AuthContext'
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

interface DashboardContextData {
  profile: AccountDetailsData
  vaccines: LengthAwarePaginatorVaccine
  vaxxedPeople: LengthAwarePaginatorVaxxedPeople
  setVaccines: (vaccines: LengthAwarePaginatorVaccine) => void
  setVaxxedPeople: (people: LengthAwarePaginatorVaxxedPeople) => void
  registerVaccine: (data: RegisterVaccineData) => Promise<void>
  deleteVaccines: (data: DefaultDeleteData) => Promise<void>
  registerVaxedPerson: (data: RegisterVaxxedPeopleData) => Promise<void>
  deleteVaxxedPeople: (data: DefaultDeleteData) => Promise<void>
  getProfile: () => Promise<void>
  getVaccines: (page?: number) => Promise<void>
  getVaxxedPeople: (page?: number) => Promise<void>
  updateProfile: (data: AccountDetailsData) => Promise<void>
  setIsProfileLoaded: React.Dispatch<React.SetStateAction<boolean>>
  isProfileLoaded: boolean
  setIsVaccinesLoaded: React.Dispatch<React.SetStateAction<boolean>>
  isVaccinesLoaded: boolean
  setIsVaxxedPeopleLoaded: React.Dispatch<React.SetStateAction<boolean>>
  isVaxxedPeopleLoaded: boolean
  deleteProfile: () => Promise<void>
}

interface DashboardProviderProps {
  children: ReactNode
}

export const DashboardContext = createContext<DashboardContextData>({} as DashboardContextData)

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const { jwtToken } = useContext(AuthContext)

  const [isProfileLoaded, setIsProfileLoaded]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
    useState(false)

  const [isVaccinesLoaded, setIsVaccinesLoaded]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
    useState(false)

  const [isVaxxedPeopleLoaded, setIsVaxxedPeopleLoaded]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
    useState(false)

  const [profile, setProfile] = useState<AccountDetailsData>({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    language: ''
  })

  const [vaccines, setVaccines] = useState<LengthAwarePaginatorVaccine>({
    current_page: 0,
    last_page: 0,
    per_page: 0,
    total: 0,
    data: []
  })

  const [vaxxedPeople, setVaxxedPeople] = useState<LengthAwarePaginatorVaxxedPeople>({
    current_page: 0,
    last_page: 0,
    per_page: 0,
    total: 0,
    data: []
  })

  const getVaccines = useCallback(
    async (page?: number) => {
      try {
        if (!jwtToken) {
          return
        }

        const data: LengthAwarePaginatorVaccine = await dashboardApi.getVaccines(jwtToken, page)

        setVaccines(data)
        setIsVaccinesLoaded(true)
      } catch (error) {
        console.error('Error getting vaccines:', error)
        toast.error('Error getting vaccines')
      }
    },
    [jwtToken]
  )

  const getProfile = useCallback(async () => {
    try {
      if (!jwtToken) {
        return
      }

      const data: ProfileApiData = await dashboardApi.getUserProfile(jwtToken)

      const userProfile: AccountDetailsData = {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        country: data.country,
        language: data.language
      }

      setProfile(userProfile)
      setIsProfileLoaded(true)
    } catch (error) {
      console.error('Error getting user profile:', error)
      toast.error('Error getting user profile')
    }
  }, [jwtToken])

  const getVaxxedPeople = useCallback(
    async (page?: number) => {
      try {
        if (!jwtToken) {
          return
        }

        const data: LengthAwarePaginatorVaxxedPeople = await dashboardApi.getVaxxedPeople(jwtToken, page)

        setVaxxedPeople(data)
        setIsVaxxedPeopleLoaded(true)
      } catch (error) {
        console.error('Error getting vaxxed people:', error)
        toast.error('Error getting vaxxed people')
      }
    },
    [jwtToken]
  )

  const registerVaccine = async (data: RegisterVaccineData) => {
    try {
      if (!jwtToken) {
        return
      }

      const vax: VaccineApiData = {
        name: data.name,
        lot: data.lot,
        expiry_date: data.expiryDate
      }

      await dashboardApi.registerVaccine(vax, jwtToken)
      toast.success('Vaccine registered successfully!')
      getVaccines()
    } catch (error) {
      console.error('Error registering vaccine:', error)
      toast.error('Error registering vaccine')
    }
  }

  const deleteVaccines = async (data: DefaultDeleteData) => {
    try {
      if (!jwtToken) {
        return
      }

      await dashboardApi.deleteVaccines(data, jwtToken)
      toast.success('Vaccine deleted successfully!')
      getVaccines()
    } catch (error) {
      console.error('Error deleting vaccine:', error)
      toast.error('Error deleting vaccine')
    }
  }

  const registerVaxedPerson = async (data: RegisterVaxxedPeopleData) => {
    try {
      if (!jwtToken) {
        return
      }

      const vaxxedPeople: VaxxedPeopleApiData = {
        cpf: data.cpf,
        vaccine_id: data.vaccineId,
        full_name: data.fullName,
        birthdate: data.birthDate,
        first_dose: data.firstDose,
        second_dose: data.secondDose,
        third_dose: data.thirdDose,
        vaccine_applied: data.vaccineApplied,
        has_comorbidity: data.hasComorbidity
      }

      await dashboardApi.registerVaxedPerson(vaxxedPeople, jwtToken)
      toast.success('Vaxxed person registered successfully!')
      getVaxxedPeople()
    } catch (error) {
      console.error('Error registering vaxxed person:', error)
      toast.error('Error registering vaxxed person')
    }
  }

  const deleteVaxxedPeople = async (data: DefaultDeleteData) => {
    try {
      if (!jwtToken) {
        return
      }

      await dashboardApi.deleteVaxxedPeople(data, jwtToken)
      toast.success('Vaxxed people deleted successfully!')
      getVaxxedPeople()
    } catch (error) {
      console.error('Error deleting vaxxed people:', error)
      toast.error('Error deleting vaxxed people')
    }
  }

  const updateProfile = async (data: AccountDetailsData) => {
    try {
      if (!jwtToken) {
        return
      }

      const userProfile: ProfileApiData = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        country: data.country,
        language: data.language
      }

      await dashboardApi.updateUserProfile(userProfile, jwtToken)
      toast.success('Profile updated with success!')
      getProfile()
    } catch (error) {
      console.error('Error trying to update user profile:', error)
      toast.error('Error trying to update user profile:')
    }
  }

  const deleteProfile = async () => {
    if (!jwtToken) {
      return
    }

    fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    })
      .then(response => {
        if (response.ok) {
          window.location.assign('/login')

          return dashboardApi.deleteUserProfile(jwtToken)
        }

        console.error('Failed to delete account')
        toast.error('Error trying to delete account. Try again later')

        return
      })
      .catch(error => {
        new Promise(resolve => setTimeout(resolve, 500)).then(() => {
          console.error('Error during logout or deleting user profile:', error)
          toast.error('Error trying to delete profile or logout. Try again later')
          window.location.assign('/login')
        })
      })
  }

  return (
    <DashboardContext.Provider
      value={{
        profile,
        vaccines,
        vaxxedPeople,
        setIsProfileLoaded,
        isProfileLoaded,
        setVaccines,
        setVaxxedPeople,
        registerVaccine,
        deleteVaccines,
        registerVaxedPerson,
        deleteVaxxedPeople,
        getProfile,
        getVaccines,
        getVaxxedPeople,
        updateProfile,
        deleteProfile,
        setIsVaccinesLoaded,
        isVaccinesLoaded,
        setIsVaxxedPeopleLoaded,
        isVaxxedPeopleLoaded
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
