// Get references to DOM elements
const recipeContainer = document.querySelector('#recipeContainer'); // Container for displaying recipes
const searchButton = document.querySelector('.search-bar button'); // Button to trigger recipe search
const searchInput = document.querySelector('.search-bar input'); // Input field for search query

// Search for recipes based on query
async function searchRecipes(query) {
  try {
    // Make API call to fetch recipes by search query
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    
    // Check if meals were found in the response
    if (data.meals) {
      return data.meals; // Return meals data
    } else {
      console.error('No meals found for query:', query);
      return []; // Return empty array if no meals found
    }
  } catch (error) {
    console.error('Error fetching search results:', error); // Log any errors
    return []; // Return empty array on error
  }
}

// Display a list of recipes in the container
function displayRecipes(recipes) {
  recipeContainer.innerHTML = ''; // Clear the container before displaying new recipes

  if (recipes.length === 0) {
    recipeContainer.innerHTML = '<p>No recipes found!</p>'; // Show a message if no recipes are found
    return;
  }

  // Loop through recipes and create recipe cards
  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe';
    card.innerHTML = `
      <h3>${recipe.strMeal}</h3>
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
      <div class="recipe-actions">
        <button class="favorite-btn" onclick="toggleFavorite(${recipe.idMeal}, '${recipe.strMeal}', '${recipe.strMealThumb}')">
          Add to Favorites
        </button>
        <a href="recipe.html?id=${recipe.idMeal}" class="view-recipe-btn">
          View Recipe
        </a>
      </div>
    `;
    recipeContainer.appendChild(card); // Append the card to the recipe container
  });
}

// Toggle adding/removing a recipe from favorites
function toggleFavorite(id, name, image) {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]'); // Get favorites from localStorage
  const exists = favorites.some(fav => fav.idMeal === id); // Check if the recipe is already in favorites
  
  if (!exists) {
    favorites.push({ idMeal: id, strMeal: name, strMealThumb: image }); // Add recipe to favorites
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Save favorites to localStorage
    alert('Added to favorites!');
  } else {
    alert('Already in favorites!');
  }
}

// Load random recipes upon page load
async function loadRandomRecipes() {
  try {
    // Fetch 5 random recipes in parallel using Promise.all
    const randomRecipesPromises = Array(5).fill('https://www.themealdb.com/api/json/v1/1/random.php').map(url => fetch(url).then(res => res.json()));
    const randomRecipesData = await Promise.all(randomRecipesPromises);
    
    // Combine all random recipes into one array
    const randomRecipes = randomRecipesData.flatMap(data => data.meals);
    displayRecipes(randomRecipes); // Display the fetched random recipes
  } catch (error) {
    console.error('Error loading random recipes:', error); // Log any errors
  }
}

// Event listener for search button click
searchButton.addEventListener('click', async () => {
  const query = searchInput.value.trim(); // Get the search input value
  if (query) {
    const recipes = await searchRecipes(query); // Fetch recipes based on the query
    displayRecipes(recipes); // Display the results
  }
});

// Event listener for 'Enter' key press in search input field
searchInput.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') { // Check if 'Enter' key is pressed
    const query = searchInput.value.trim(); // Get the search input value
    if (query) {
      const recipes = await searchRecipes(query); // Fetch recipes based on the query
      displayRecipes(recipes); // Display the results
    }
  }
});

// Load random recipes when the page loads
document.addEventListener('DOMContentLoaded', loadRandomRecipes);

// ---------------------------- Recipe Details (for recipe.html) ----------------------------

// Fetch and display detailed recipe information
async function getRecipeDetails() {
  const urlParams = new URLSearchParams(window.location.search); // Get URL query parameters
  const recipeId = urlParams.get('id'); // Extract the recipe ID from the query string

  try {
    // Fetch the recipe details using the ID
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const data = await response.json();

    // Check if recipe details were found
    if (data.meals && data.meals.length > 0) {
      const recipe = data.meals[0]; // Get the first recipe from the response
      const recipeDetails = document.getElementById('recipeDetails');
      
      // Display the recipe details in the HTML
      recipeDetails.innerHTML = `
        <h2>${recipe.strMeal}</h2>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        <p><strong>Category:</strong> ${recipe.strCategory}</p>
        <p><strong>Cuisine:</strong> ${recipe.strArea}</p>
        <h3>Ingredients</h3>
        <ul>
          ${Object.keys(recipe)
            .filter(key => key.startsWith('strIngredient') && recipe[key])
            .map(key => `<li>${recipe[key]} - ${recipe[`strMeasure${key.slice(13)}`]}</li>`)
            .join('')}
        </ul>
        <h3>Instructions</h3>
        <p>${recipe.strInstructions}</p>
      `;
    } else {
      document.getElementById('recipeDetails').innerHTML = '<p>Recipe not found.</p>'; // Show error if no recipe found
    }
  } catch (error) {
    console.error('Error fetching recipe details:', error); // Log any errors
    document.getElementById('recipeDetails').innerHTML = '<p>Error loading recipe details.</p>'; // Show error message
  }
}

// Check if we are on the recipe details page and call the function
if (window.location.pathname === '/recipe.html') {
  getRecipeDetails(); // Fetch and display recipe details
}
