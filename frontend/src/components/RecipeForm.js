import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRecipesContext } from "../hooks/useRecipesContext";

const RecipeForm=({ recipeToEdit, setRecipeToEdit })=>{
    const{dispatch}=useRecipesContext()
    const { user } = useAuthContext()

    const [title,setTitle]=useState('')
    const [ingredient,setIngredient]=useState('')
    const [instruction,setInstruction]=useState('')
    const [time,setTime]=useState('')
    const [difficulty,setDifficulty]=useState('')
    const [error,setError]=useState(null)
    const [emptyFields,setEmptyFields]=useState([])

    useEffect(() => {
        if (recipeToEdit) {
            setTitle(recipeToEdit.title);
            setIngredient(recipeToEdit.ingredient);
            setInstruction(recipeToEdit.instruction);
            setTime(recipeToEdit.time);
            setDifficulty(recipeToEdit.difficulty);
        }
    }, [recipeToEdit]);

    const handleSubmit= async (e)=> {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const recipe={title,ingredient,instruction,time,difficulty}

        const response = await fetch (recipeToEdit ? `${process.env.REACT_APP_API_URL}/api/recipes/${recipeToEdit._id}` : `${process.env.REACT_APP_API_URL}/api/recipes`,{
            method: recipeToEdit ? 'PATCH' : 'POST',
            body:JSON.stringify(recipe),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json= await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setIngredient('')
            setInstruction('')
            setTime('')
            setDifficulty('')
            setError(null)
            setEmptyFields([])
            console.log(recipeToEdit ? 'Recipe updated' : 'New recipe added', json);
            dispatch({ type: recipeToEdit ? "UPDATE_RECIPE" : "CREATE_RECIPE", payload: json });

            if (recipeToEdit) {
                setRecipeToEdit(null);
            }
        }
    }
    return(
         <form className="create" onSubmit={handleSubmit}>
            <h3>{recipeToEdit ? 'Edit Recipe' : 'Add a New Recipe'}</h3>

            <label>Recipe Title: </label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Ingredients:</label>
            <input
                type="text"
                onChange={(e) => setIngredient(e.target.value)}
                value={ingredient}
                className={emptyFields.includes('ingredient') ? 'error' : ''}
            />

            <label>Instruction:</label>
            <input
                type="text"
                onChange={(e) => setInstruction(e.target.value)}
                value={instruction}
                className={emptyFields.includes('instruction') ? 'error' : ''}
            />
            <label>Time:</label>
            <input
                type="text"
                onChange={(e) => setTime(e.target.value)}
                value={time}
                className={emptyFields.includes('time') ? 'error' : ''}
            />
            <label>Difficulty Level:</label>
            <select className={emptyFields.includes('diffculty') ? 'error' : ''}>
                <option value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>Easy</option>
                <option value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>Medium</option>
                <option value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>Hard</option>
            </select><br></br>
            <button>{recipeToEdit ? 'Update Recipe' : 'Add Recipe'}</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default RecipeForm;