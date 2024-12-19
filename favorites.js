// Function to display favorite recipes on the Favorites page
const displayFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteRecipesContainer = document.getElementById('favoriteRecipesContainer');
  
    if (favorites.length > 0) {
      favoriteRecipesContainer.innerHTML = ''; // Clear previous favorites
  
      favorites.forEach(meal => {
        const mealElement = document.createElement('div');
        mealElement.classList.add('recipe');
        mealElement.innerHTML = `
          <h3>${meal.strMeal}</h3>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">See Recipe</a>
          <button onclick="removeFromFavorites(${meal.idMeal})">Remove from Favorites</button>
        `;
  
        favoriteRecipesContainer.appendChild(mealElement);
      });
    } else {
      favoriteRecipesContainer.innerHTML = '<p>No favorites found. Here are some suggested recipes:</p>';
      getRandomMeals(); // Load random recipes if no favorites
    }
  };
  
  // Function to remove a recipe from favorites
  const removeFromFavorites = (mealId) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(meal => meal.idMeal !== mealId); // Remove the meal by its id
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites(); // Re-render the favorites
  };
  
  // Function to fetch random meals (for suggested recipes)
  const getRandomMeals = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/random.php`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.meals && data.meals.length > 0) {
        displayRecipes(data.meals);
      } else {
        favoriteRecipesContainer.innerHTML = '<p>No suggested recipes found. Try again later.</p>';
      }
    } catch (error) {
      console.error('Error fetching random meals:', error);
      favoriteRecipesContainer.innerHTML = '<p>There was an error fetching the suggested recipes. Please try again later.</p>';
    }
  };
  
  // Function to display the suggested recipes (fallback if no favorites)
  const displayRecipes = (recipes) => {
    const favoriteRecipesContainer = document.getElementById('favoriteRecipesContainer');
    recipes.forEach(recipe => {
      const recipeElement = document.createElement('div');
      recipeElement.classList.add('recipe');
      recipeElement.innerHTML = `
        <h3>${recipe.strMeal}</h3>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
        <a href="https://www.themealdb.com/meal/${recipe.idMeal}" target="_blank">See Recipe</a>
      `;
      favoriteRecipesContainer.appendChild(recipeElement);
    });
  };
  
  // Load the favorites when the page loads
  window.addEventListener('load', displayFavorites);
  