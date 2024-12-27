import { useEffect, useState } from 'react'

export default function useLocalStorageState<T>(
  key: string,
  initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const isBrowser = typeof window !== 'undefined'

  const [state, setState] = useState<T>(() => {
    if (isBrowser) {
      const savedState = localStorage.getItem(key)

      return savedState
        ? JSON.parse(savedState)
        : typeof initialValue === 'function'
          ? (initialValue as () => T)()
          : initialValue
    }

    return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue
  })

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem(key, JSON.stringify(state))
    }
  }, [isBrowser, key, state])

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setState(JSON.parse(event.newValue))
      }
    }

    if (isBrowser) {
      window.addEventListener('storage', handleStorageChange)
    }

    return () => {
      if (isBrowser) {
        window.removeEventListener('storage', handleStorageChange)
      }
    }
  }, [isBrowser, key])

  return [state, setState]
}
