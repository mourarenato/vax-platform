import { useState } from 'react'

import type { AuthData } from '@/types/components'

const useAppState = () => {
  const [data, setData] = useState<AuthData>({ name: '', email: '', password: '' })
  const [isAuth, setIsAuth] = useState(false)
  const [userId, setUserId] = useState('')
  const [jwtToken, setJwtToken] = useState('')

  return {
    data,
    setData,
    isAuth,
    setIsAuth,
    setJwtToken,
    jwtToken,
    userId,
    setUserId
  }
}

export default useAppState
