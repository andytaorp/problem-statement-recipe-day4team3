import React, { useState, useEffect } from 'react';

const EditRecipe = ({ recipe, onUpdate }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (recipe) {
      setName(recipe.name || '');
      setIngredients(recipe.ingredients || '');
      setInstructions(recipe.instructions || '');
    }
  }, [recipe]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !ingredients || !instructions) {
      setError('All fields are required.');
      return;
    }

    setError('');
    setSuccess(true);

    onUpdate({ ...recipe, name, ingredients, instructions });
  };

  return (
    <div className="form-page">
      <h2>Edit Recipe</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Recipe Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-btn">Update Recipe</button>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">Recipe updated successfully!</div>}
      </form>
    </div>
  );
};

export default EditRecipe;
