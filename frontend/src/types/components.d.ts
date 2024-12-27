export type ErrorHandlerProps = {
  error: unknown
  action: string
}

export type AuthData = {
  name?: string
  email: string
  password: string
  details?: DetailsData
}

type DetailsData = {
  firstName: string
  lastName: string
  country: string
  language: string
}

export type RegisterVaxxedPeopleData = {
  id?: string
  cpf: string
  fullName: string
  birthDate: Date | string
  firstDose: Date | string
  secondDose: Date | string
  thirdDose: Date | string
  vaccineApplied: string
  vaccineId: number | null
  hasComorbidity: number
}

export type RegisterVaccineData = {
  name: string
  lot: string
  expiryDate: Date | string
}

export type DefaultDeleteData = {
  ids: string[]
}

export type AccountDetailsData = {
  firstName: string
  lastName: string
  email: string
  country: string
  language: string
}
