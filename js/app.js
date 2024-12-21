// Event Handlers
async function handleViewRecipe(id) {
    const recipe = await getRecipeDetails(id);
    if (recipe) {
      ui.showRecipeDetails(recipe);
    }
  }
  
  function handleFavoriteClick(id, name, image) {
    const recipe = { idMeal: id, strMeal: name, strMealThumb: image };
    if (favoritesManager.isFavorite(id)) {
      favoritesManager.remove(id);
    } else {
      favoritesManager.add(recipe);
    }
    refreshCurrentView();
  }
  
  function refreshCurrentView() {
    const activeSection = document.querySelector('.section.active').id;
    if (activeSection === 'favorites') {
      ui.showRecipes(favoritesManager.getAll(), ui.favoritesGrid);
    } else {
      ui.showRecipes(currentRecipes, ui.recipeGrid);
    }
  }
  
  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', async () => {
      const section = link.dataset.section;
      ui.setActiveTab(section);
      
      if (section === 'home') {
        const recipes = await loadRandomRecipes();
        currentRecipes = recipes;
        ui.showRecipes(recipes, ui.recipeGrid);
      } else if (section === 'favorites') {
        ui.showRecipes(favoritesManager.getAll(), ui.favoritesGrid);
      }
    });
  });
  
  // Search
  let currentRecipes = [];
  document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
      const recipes = await searchRecipes(query);
      currentRecipes = recipes;
      ui.showRecipes(recipes, ui.recipeGrid);
    }
  });
  
  document.getElementById('searchInput').addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
      const query = e.target.value.trim();
      if (query) {
        const recipes = await searchRecipes(query);
        currentRecipes = recipes;
        ui.showRecipes(recipes, ui.recipeGrid);
      }
    }
  });
  
  // Modal
  document.querySelector('.close-button').addEventListener('click', () => {
    ui.closeModal();
  });
  
  document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target === modal) {
      ui.closeModal();
    }
  });
  
  // Initial Load
  window.addEventListener('DOMContentLoaded', async () => {
    const recipes = await loadRandomRecipes();
    currentRecipes = recipes;
    ui.showRecipes(recipes, ui.recipeGrid);
  });