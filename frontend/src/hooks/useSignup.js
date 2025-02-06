import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false) // Fixed initial state
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/register`, {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error || 'An error occurred') // Fixed potential undefined error
      return
    }

    // Save the user to local storage
    localStorage.setItem('user', JSON.stringify(json))

    // Update the auth context
    dispatch({ type: 'LOGIN', payload: json })

    // Update loading state
    setIsLoading(false)
  }

  return { signup, isLoading, error }
}
