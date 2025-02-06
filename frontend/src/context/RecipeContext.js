import { createContext, useReducer } from "react";

export const RecipesContext =createContext()

export const workoutsReducer = (state, action) => {
    switch (action.type) {
      case 'SET_Recipe':
        return {
          recipes: action.payload,
        };
      case 'CREATE_Recipe':
        return {
          recipes: [action.payload, ...state.recipes],
        };
      case 'UPDATE_Recipe':
        return {
          recipes: state.recipes.map((workout) =>
                recipe._id === action.payload._id ? action.payload : recipe
                ),
        };
      case 'DELETE_Recipe':
        return {
          recipes: state.recipes.filter((w) => w._id !== action.payload._id),
        };
      default:
        return state;
    }
  };

export const WorkoutsContextProvider=({children})=>{

    const[state,dispatch]=useReducer(workoutsReducer,{
        workouts:null
    })

    return(
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}