import React, { useEffect, useState } from "react";
import { getRecipes, deleteRecipe } from "../services/recipeService";
import { useAuth } from "../context/AuthContext";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const { user } = useAuth(); // Get user from context

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const data = await getRecipes();
    setRecipes(data);
  };

  const handleDelete = async (id) => {
    if (user) {
      await deleteRecipe(id, user.token);
      fetchRecipes();
    } else {
      alert("You must be logged in to delete a recipe.");
    }
  };

  return (
    <div>
      <h2>All Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <h3>{recipe.name}</h3>
            <p>Difficulty: {recipe.difficulty}</p>
            <p>Prep Time: {recipe.prepTime} minutes</p>
            <button onClick={() => handleDelete(recipe._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
