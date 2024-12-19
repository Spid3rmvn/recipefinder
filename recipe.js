const recipeContainer = document.querySelector('.container');
const searchButton = document.querySelector('button');
const searchInput = document.querySelector('input[type="text"]');
const favoriteRecipesContainer = document.getElementById('favoriteRecipesContainer');
const loadingMessage = document.getElementById('loadingMessage');
const loadingSpinner = document.getElementById('loadingSpinner');

// Function to fetch popular recipes (Home page)
const getPopularRecipes = async () => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=American`; // Example category: American meals
  try {
    loadingMessage.textContent = 'Loading popular recipes...';
    loadingSpinner.style.display = 'block';

    const response = await fetch(url);
    const data = await response.json();

    if (data.meals && data.meals.length > 0) {
      displayRecipes(data.meals);
    } else {
      recipeContainer.innerHTML = '<p>No popular recipes found. Try again later.</p>';
    }
  } catch (error) {
    console.error('Error fetching popular recipes:', error);
    recipeContainer.innerHTML = '<p>There was an error fetching the recipes. Please try again later.</p>';
  } finally {
    loadingSpinner.style.display = 'none';
  }
};

// Function to fetch random recipes (for the suggested recipes on the Favorites page)
const getRandomMeals = async () => {
  const url = `https://www.themealdb.com/api/json/v1/1/random.php`;

  try {
    loadingMessage.textContent = 'Loading suggested recipes...';
    loadingSpinner.style.display = 'block';

    const response = await fetch(url);
    const data = await response.json();

    if (data.meals && data.meals.length > 0) {
      displayRecipes(data.meals);
    } else {
      recipeContainer.innerHTML = '<p>No suggested recipes found. Try again later.</p>';
    }
  } catch (error) {
    console.error('Error fetching suggested recipes:', error);
    recipeContainer.innerHTML = '<p>There was an error fetching suggested recipes. Please try again later.</p>';
  } finally {
    loadingSpinner.style.display = 'none';
  }
};

// Function to display recipes on the page
const displayRecipes = (recipes) => {
  recipeContainer.innerHTML = ''; // Clear previous results

  if (recipes.length === 0) {
    recipeContainer.innerHTML = '<p>No recipes found.</p>';
  } else {
    recipes.forEach(recipe => {
      const recipeElement = document.createElement('div');
      recipeElement.classList.add('recipe');
      recipeElement.innerHTML = `
        <h3>${recipe.strMeal}</h3>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
        <a href="https://www.themealdb.com/meal/${recipe.idMeal}" target="_blank">See Recipe</a>
        <button onclick="saveToFavorites(${JSON.stringify(recipe)})">Add to Favorites</button>
      `;

      recipeContainer.appendChild(recipeElement);
    });
  }
};

// Function to save a recipe to favorites
const saveToFavorites = (meal) => {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  // Check if the recipe is already in the favorites
  if (!favorites.some(fav => fav.idMeal === meal.idMeal)) {
    favorites.push(meal);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Recipe added to favorites!');
  } else {
    alert('This recipe is already in your favorites!');
  }
};

// Function to display favorite recipes on the Favorites page
const displayFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length > 0) {
    favoriteRecipesContainer.innerHTML = ''; // Clear previous favorites

    favorites.forEach(meal => {
      const mealElement = document.createElement('div');
      mealElement.classList.add('recipe');
      mealElement.innerHTML = `
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">See Recipe</a>
      `;

      favoriteRecipesContainer.appendChild(mealElement);
    });
  } else {
    favoriteRecipesContainer.innerHTML = '<p>No favorites found. Here are some suggested recipes:</p>';
    getRandomMeals(); // Load random recipes if no favorites
  }
};

// Event listener for the search button
searchButton.addEventListener('click', () => {
  const ingredients = searchInput.value.trim();
  if (ingredients) {
    getMealsByIngredient(ingredients);
  } else {
    recipeContainer.innerHTML = '<p>Please enter ingredients to search.</p>';
  }
});

// Event listener for Enter key on search input
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchButton.click();
  }
});

// Function to fetch meals based on ingredients (search functionality)
const getMealsByIngredient = async (ingredient) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  try {
    loadingMessage.textContent = 'Searching for recipes...';
    loadingSpinner.style.display = 'block';

    const response = await fetch(url);
    const data = await response.json();

    if (data.meals && data.meals.length > 0) {
      displayRecipes(data.meals);
    } else {
      recipeContainer.innerHTML = '<p>No recipes found for this ingredient. Try again with different ingredients.</p>';
    }
  } catch (error) {
    console.error('Error fetching meals:', error);
    recipeContainer.innerHTML = '<p>There was an error fetching the recipes. Please try again later.</p>';
  } finally {
    loadingSpinner.style.display = 'none';
  }
};

// Fetch popular recipes on the Home page load
if (window.location.pathname.includes('index.html')) {
  getPopularRecipes();
}

// Display favorite recipes on the Favorites page load
if (window.location.pathname.includes('favorites.html')) {
  displayFavorites();
}
