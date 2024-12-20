
# Recipe Finder

A web application that allows users to search for recipes, view random recipes, and save their favorite recipes to local storage. It uses the MealDB API to fetch and display data about various meals and their details.

## Features
- **Search Recipes**: Users can search for recipes based on meal names.
- **Random Recipes**: Users can view random recipes generated on page load.
- **Recipe Details**: Each recipe card links to a detailed view where users can see the recipe ingredients and instructions.
- **Favorites**: Users can add recipes to their favorites, which are saved in the browser's local storage.

## Tech Stack
- **HTML**: Structure of the web pages.
- **CSS**: Styling and layout of the web pages.
- **JavaScript**: Dynamic behavior, including fetching recipes from the API, handling favorites, and managing page interactions.
- **API**: [TheMealDB API](https://www.themealdb.com/api.php) for fetching meal data.

## Getting Started

### Prerequisites
To run this project locally, you'll need:
- A web browser (such as Chrome, Firefox, or Edge).

### Installation
1. Clone the repository or download the project files.
2. Open the `index.html` file in your browser to view the application.

### How to Use
1. **Search for Recipes**: Enter a meal name in the search bar and click the search button to find recipes.
2. **Random Recipes**: The homepage will display random recipes when it loads.
3. **View Recipe Details**: Click the "View Recipe" button on any recipe card to see detailed information about the recipe.
4. **Add to Favorites**: Click the "Add to Favorites" button to save a recipe to your favorites. These are stored in your browser's local storage.

### Local Storage
- The application saves favorite recipes to the local storage of your browser, meaning they persist across sessions until the local storage is cleared.

## License
This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgements
- This project uses data from [TheMealDB API](https://www.themealdb.com/api.php).
