import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../hooks/useAuthContext"
import { useRecipesContext } from "../hooks/useRecipesContext"

const RecipeDetails=({recipe,setRecipeToEdit})=>{

    const {dispatch}=useRecipesContext ()
    const { user } = useAuthContext()
    const handleClick= async()=>{
        if (!user) {
            return
        }
        const response= await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${recipe._id}`, {
            method:'DELETE',
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json= await response.json()

        if(response.ok){
            dispatch({type:'DELETE_WORKOUT',payload: json})
        }
    }

    return(
        <div className="workout-details">
            <h4>{recipe.title}</h4>
            <p><strong>Ingredients : </strong>{recipe.ingredients}</p>
            <p><strong>Cooking instructions : </strong>{recipe.instructions}</p>
            <p>Preparation takes {recipe.time}</p>
            <p>Difficulty level: {recipe.difficulty}</p>
            <p>{formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            <p className="edit"  onClick={() => setRecipeToEdit(recipe)}>edit</p>
            
        </div>
    )
}

export default RecipeDetails;