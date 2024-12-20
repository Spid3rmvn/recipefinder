// Get the container element for displaying favorite recipes
const favoriteRecipesContainer = document.querySelector('#favoriteRecipesContainer');

// Function to display favorite recipes
function displayFavorites() {
  // Get the list of favorite recipes from local storage
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  // Clear the container element
  favoriteRecipesContainer.innerHTML = '';

  // Check if there are no favorite recipes
  if (favorites.length === 0) {
    // Display a message if there are no favorite recipes
    favoriteRecipesContainer.innerHTML = '<p>No favorites yet. Add some recipes!</p>';
    return;
  }

  // Loop through each favorite recipe and create a card element
  favorites.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe';

    // Set the HTML content of the card element
    card.innerHTML = `
      <h3>${recipe.strMeal}</h3>
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
      <div class="recipe-actions">
        <button class="favorite-btn" onclick="removeFavorite(${recipe.idMeal})">
          Remove from Favorites
        </button>
        <a href="recipe.html?id=${recipe.idMeal}" class="view-recipe-btn">
          View Recipe
        </a>
      </div>
    `;

    // Append the card element to the container element
    favoriteRecipesContainer.appendChild(card);
  });
}

// Function to remove a recipe from favorites
function removeFavorite(id) {
  // Get the list of favorite recipes from local storage
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  // Filter out the recipe to be removed
  const filtered = favorites.filter(fav => fav.idMeal !== id);

  // Update the list of favorite recipes in local storage
  localStorage.setItem('favorites', JSON.stringify(filtered));

  // Refresh the favorites list
  displayFavorites();
}

// Initialize the display of favorite recipes
displayFavorites();