// Fetch recipe details on recipe.html page load
async function getRecipeDetails() {
  // Get the query parameters from the current URL
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('id'); // Extract the recipe ID from the URL query string

  // If no recipe ID is found in the URL, display an error message
  if (!recipeId) {
    document.getElementById('recipeDetails').innerHTML = '<p>No recipe ID found.</p>';
    return;
  }

  try {
    // Fetch recipe details from the API using the recipe ID
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const data = await response.json();

    // Check if recipe data exists
    if (data.meals && data.meals.length > 0) {
      const recipe = data.meals[0]; // Extract the first recipe from the response
      const recipeDetails = document.getElementById('recipeDetails'); // Get the recipe details container

      // Display the recipe details in the HTML
      recipeDetails.innerHTML = `
        <h2>${recipe.strMeal}</h2>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        <p><strong>Category:</strong> ${recipe.strCategory}</p>
        <p><strong>Cuisine:</strong> ${recipe.strArea}</p>
        <h3>Ingredients</h3>
        <ul>
          ${Object.keys(recipe)
            .filter(key => key.startsWith('strIngredient') && recipe[key]) // Filter out ingredient keys
            .map(key => `<li>${recipe[key]} - ${recipe[`strMeasure${key.slice(13)}`]}</li>`) // Display ingredient and measurement
            .join('')} <!-- Join the list of ingredients into an unordered list -->
        </ul>
        <h3>Instructions</h3>
        <p>${recipe.strInstructions}</p> <!-- Display cooking instructions -->
      `;
    } else {
      document.getElementById('recipeDetails').innerHTML = '<p>Recipe not found.</p>'; // Display message if no recipe found
    }
  } catch (error) {
    // Catch any errors that occur during the fetch request
    console.error('Error fetching recipe details:', error);
    document.getElementById('recipeDetails').innerHTML = '<p>Error loading recipe details.</p>'; // Display error message if fetch fails
  }
}

// Call the function to load the recipe details once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', getRecipeDetails);
