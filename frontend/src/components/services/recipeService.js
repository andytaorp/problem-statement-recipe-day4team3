import axios from "axios";

const API_URL = "http://localhost:5000/api/recipes"; // Change for production

// Get all recipes
export const getRecipes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a single recipe
export const getRecipeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Add a new recipe
export const addRecipe = async (recipeData, token) => {
  const response = await axios.post(API_URL, recipeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update a recipe
export const updateRecipe = async (id, updatedData, token) => {
  const response = await axios.patch(`${API_URL}/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete a recipe
export const deleteRecipe = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
