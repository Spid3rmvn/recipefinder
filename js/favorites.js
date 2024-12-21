class FavoritesManager {
    constructor() {
      this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    }
  
    save() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  
    add(recipe) {
      if (!this.isFavorite(recipe.idMeal)) {
        this.favorites.push({
          idMeal: recipe.idMeal,
          strMeal: recipe.strMeal,
          strMealThumb: recipe.strMealThumb
        });
        this.save();
      }
    }
  
    remove(id) {
      this.favorites = this.favorites.filter(recipe => recipe.idMeal !== id);
      this.save();
    }
  
    isFavorite(id) {
      return this.favorites.some(recipe => recipe.idMeal === id);
    }
  
    getAll() {
      return this.favorites;
    }
  }
  
  const favoritesManager = new FavoritesManager();