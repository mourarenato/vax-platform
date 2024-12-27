export type UserApiData = {
  name?: string
  email: string
  password: string
  details?: DetailsApiData
}

export type DetailsApiData = {
  firstName: string
  lastName: string
  country: string
  language: string
}

export type ProfileApiData = {
  first_name: string
  last_name: string
  email: string
  country: string
  language: string
}

export type VaxxedPeopleApiData = {
  id?: string
  cpf: string
  full_name: string
  birthdate: Date | string
  first_dose: Date | string
  second_dose: Date | string
  third_dose: Date | string
  vaccine_id: number | null
  vaccine_applied: string | null
  has_comorbidity: number
}

export type LengthAwarePaginatorVaxxedPeople = {
  current_page: number
  last_page: number
  per_page: number
  total: number
  data: Array<any>
}

export type VaccineApiData = {
  id?: string
  name: string
  lot: string
  expiry_date: Date | string
}

export type LengthAwarePaginatorVaccine = {
  current_page: number
  last_page: number
  per_page: number
  total: number
  data: Array<any>
}
