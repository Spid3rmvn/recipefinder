// API URL for TheMealDB
const API_URL = 'https://www.themealdb.com/api/json/v1/1';
let currentRecipes = [];

// Clear existing favorites on page load
localStorage.removeItem('favorites');

// Get recipes from API
async function getRecipes(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.log('Error:', error);
        return [];
    }
}

// Search recipes
async function searchRecipes() {
    const query = document.getElementById('searchInput').value.trim();
    
    if (!query) {
        alert('Please enter a recipe name!');
        return;
    }

    document.getElementById('recipeList').innerHTML = 'Loading recipes...';
    const recipes = await getRecipes(`${API_URL}/search.php?s=${query}`);
    displayRecipes(recipes);
}

// Display recipes
function displayRecipes(recipes) {
    currentRecipes = recipes;
    const recipeList = document.getElementById('recipeList');
    
    if (recipes.length === 0) {
        recipeList.innerHTML = 'No recipes found. Try another search!';
        return;
    }

    recipeList.innerHTML = recipes.map(recipe => `
        <div class="recipe-card">
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <h3>${recipe.strMeal}</h3>
            <button onclick="viewRecipe('${recipe.idMeal}')">View Recipe</button>
            <button onclick="toggleFavorite('${recipe.idMeal}')" 
                    class="favorite-btn"
                    style="background-color: ${isFavorite(recipe.idMeal) ? '#ff4444' : '#666'}">
                ${isFavorite(recipe.idMeal) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </div>
    `).join('');
}

// View recipe details
async function viewRecipe(id) {
    const recipe = await getRecipes(`${API_URL}/lookup.php?i=${id}`);
    if (recipe.length > 0) {
        showRecipeDetails(recipe[0]);
    }
}

// Show recipe details
function showRecipeDetails(recipe) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (recipe['strIngredient' + i]) {
            ingredients.push(`${recipe['strIngredient' + i]} - ${recipe['strMeasure' + i]}`);
        }
    }

    document.getElementById('recipeDetails').innerHTML = `
        <h2>${recipe.strMeal}</h2>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        
        <h3>Ingredients:</h3>
        <ul>${ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>

        <h3>Instructions:</h3>
        <p>${recipe.strInstructions}</p>
    `;

    document.getElementById('recipePopup').style.display = 'block';
}

// Close popup
function closePopup() {
    document.getElementById('recipePopup').style.display = 'none';
}

// Handle favorites
function toggleFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const recipe = currentRecipes.find(r => r.idMeal === id) || 
                  favorites.find(f => f.idMeal === id);

    if (!recipe) return;

    if (isFavorite(id)) {
        favorites = favorites.filter(f => f.idMeal !== id);
        alert('Removed from favorites!');
    } else {
        favorites.push({
            idMeal: recipe.idMeal,
            strMeal: recipe.strMeal,
            strMealThumb: recipe.strMealThumb
        });
        alert('Added to favorites!');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Update the current view
    const currentView = document.getElementById('favoritesList').style.display === 'grid' 
        ? showFavorites()
        : displayRecipes(currentRecipes);
}

// Check if recipe is favorite
function isFavorite(id) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some(f => f.idMeal === id);
}

// Show favorites page
function showFavorites() {
    document.querySelector('.nav-btn.active').classList.remove('active');
    document.querySelectorAll('.nav-btn')[1].classList.add('active');
    
    document.getElementById('searchBox').style.display = 'none';
    document.getElementById('recipeList').style.display = 'none';
    document.getElementById('favoritesList').style.display = 'grid';

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritesList = document.getElementById('favoritesList');

    if (favorites.length === 0) {
        favoritesList.innerHTML = 'No favorite recipes yet. Add some!';
        return;
    }

    favoritesList.innerHTML = favorites.map(recipe => `
        <div class="recipe-card">
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <h3>${recipe.strMeal}</h3>
            <button onclick="viewRecipe('${recipe.idMeal}')">View Recipe</button>
            <button onclick="toggleFavorite('${recipe.idMeal}')" 
                    class="favorite-btn"
                    style="background-color: #ff4444">
                Remove from Favorites
            </button>
        </div>
    `).join('');
}

// Show home page
function showHome() {
    document.querySelector('.nav-btn.active').classList.remove('active');
    document.querySelectorAll('.nav-btn')[0].classList.add('active');
    
    document.getElementById('searchBox').style.display = 'block';
    document.getElementById('recipeList').style.display = 'grid';
    document.getElementById('favoritesList').style.display = 'none';
    
    document.getElementById('searchInput').value = '';
    document.getElementById('recipeList').innerHTML = 'Search for recipes above!';
}

// Start app
window.onload = showHome;