# Recipe Search Application

A simple web application that allows users to search for recipes using TheMealDB API. Users can view recipe details, save their favorite recipes, and manage their recipe collection.

## Features

- Search recipes by name
- View detailed recipe information including:
  - Ingredients and measurements
  - Cooking instructions
  - Recipe images
- Save favorite recipes
- Manage favorites (add/remove)
- Responsive design for mobile and desktop

## Technologies Used

- HTML
- CSS
- JavaScript 
- TheMealDB API
- LocalStorage for data persistence

## Project Structure

```
recipe-search/
│
├── index.html          # Main HTML file
├── style.css          # Styles and layout
├── script.js          # Application logic
└── README.md          # Project documentation
```

## Setup

1. Clone or download the repository
2. Open `index.html` in a web browser
3. Start searching for recipes!

## How to Use

1. **Search Recipes**
   - Enter a recipe name in the search box
   - Click the search button or press Enter
   - Browse through the search results

2. **View Recipe Details**
   - Click "View Recipe" on any recipe card
   - A popup will show ingredients and instructions

3. **Manage Favorites**
   - Click "Add to Favorites" to save a recipe
   - Navigate to Favorites page using the nav bar
   - Remove recipes from favorites as needed

## API Information

This project uses TheMealDB API:
- Base URL: `https://www.themealdb.com/api/json/v1/1`
- Endpoints used:
  - Search by name: `/search.php?s={query}`
  - Lookup by ID: `/lookup.php?i={id}`

## Local Storage

The application uses browser's localStorage to:
- Store favorite recipes
- Persist data between sessions
- Manage user preferences

