import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRecipesContext } from "../hooks/useRecipesContext";

const RecipeForm = ({ recipeToEdit, setRecipeToEdit }) => {
    const { dispatch } = useRecipesContext()
    const { user } = useAuthContext()

    const [name, setName] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [instructions, setInstructions] = useState('')
    const [prepTime, setPrepTime] = useState('')
    const [difficulty, setDifficulty] = useState('easy')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    useEffect(() => {
        if (recipeToEdit) {
            setName(recipeToEdit.name);
            setIngredients(recipeToEdit.ingredients);
            setInstructions(recipeToEdit.instructions);
            setPrepTime(recipeToEdit.prepTime);
            setDifficulty(recipeToEdit.difficulty);
        }
    }, [recipeToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError("You must be logged in");
            return;
        }

        const recipe = { name, ingredients, instructions, prepTime, difficulty }

        const response = await fetch(recipeToEdit ? `${process.env.REACT_APP_API_URL}/api/recipes/${recipeToEdit._id}` : `${process.env.REACT_APP_API_URL}/api/recipes`, {
            method: recipeToEdit ? 'PATCH' : 'POST',
            body: JSON.stringify(recipe),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        console.log(json)

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setName('')
            setIngredients('')
            setInstructions('')
            setPrepTime('')
            setDifficulty('')
            setError(null)
            setEmptyFields([])
            console.log(recipeToEdit ? 'Recipe updated' : 'New recipe added', json);
            dispatch({ type: recipeToEdit ? "UPDATE_RECIPE" : "CREATE_RECIPE", payload: json });

            if (recipeToEdit) {
                setRecipeToEdit(null);
            }
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>{recipeToEdit ? "Edit Recipe" : "Add a New Recipe"}</h3>

            <label>Recipe Name: </label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
            />

            <label>Ingredientss:</label>
            <input
                type="text"
                onChange={(e) => setIngredients(e.target.value)}
                value={ingredients}
                className={emptyFields.includes('ingredients') ? 'error' : ''}
            />

            <label>Instructions:</label>
            <input
                type="text"
                onChange={(e) => setInstructions(e.target.value)}
                value={instructions}
                className={emptyFields.includes('instructions') ? 'error' : ''}
            />
            <label>Time:</label>
            <input
                type="number"
                onChange={(e) => setPrepTime(e.target.value)}
                value={prepTime}
                className={emptyFields.includes('prepTime') ? 'error' : ''}
            />
            <label>Difficulty Level:</label>
            <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className={emptyFields.includes('difficulty') ? 'error' : ''}
            >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select><br></br>
            <button>{recipeToEdit ? 'Update Recipe' : 'Add Recipe'}</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default RecipeForm;
