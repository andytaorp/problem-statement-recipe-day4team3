import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import RecipeDetails from "../components/RecipesDetails";
import RecipeForm from "../components/RecipeForm";
import { useRecipesContext } from "../hooks/useRecipesContext";

const Home = () => {
    const { recipes, dispatch } = useRecipesContext()
    const [ recipeToEdit, setRecipeToEdit] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const {user} = useAuthContext()

    useEffect(() => {
        const fetechRecipes = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes`,{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(json)

            if (response.ok) {
                dispatch({ type: 'SET_RECIPES', payload: json })
            }
        }
        if (user) {
            fetechRecipes()
          }
    }, [dispatch,user])

    // const filteredRecipes = recipes
    //     ? recipes.filter((recipe) =>
    //         recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    //     )
    //     : [];


    return (
        <div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search recipe by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="home">
                <div className="workouts">
                    {recipes &&recipes.map((recipe) => (
                        <RecipeDetails
                            key={recipe._id}
                            recipe={recipe}
                            setRecipeToEdit={setRecipeToEdit}
                        />
                    ))}
                </div>
                <RecipeForm recipeToEdit={recipeToEdit} setRecipeToEdit={setRecipeToEdit} />
            </div>
        </div>
    )
}

export default Home;