import { useAuthContext } from './useAuthContext'
import {useRecipesContext} from './useRecipesContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchWorkouts } = useRecipesContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    //dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchWorkouts({ type: 'SET_WORKOUTS', payload: null })
  }

  return { logout }
}