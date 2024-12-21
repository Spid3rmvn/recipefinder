const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

async function fetchRecipes(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

async function loadRandomRecipes() {
  const recipes = await Promise.all(
    Array(6).fill(`${API_BASE}/random.php`)
      .map(url => fetchRecipes(url))
  );
  return recipes.flat();
}

async function searchRecipes(query) {
  return await fetchRecipes(`${API_BASE}/search.php?s=${query}`);
}

async function getRecipeDetails(id) {
  const recipes = await fetchRecipes(`${API_BASE}/lookup.php?i=${id}`);
  return recipes[0] || null;
}