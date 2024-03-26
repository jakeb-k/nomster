// Represents the criteria for filtering meals
export interface Filter {
    // Text query for searching meals, represented as a string
    query: String;

    // Ingredients to include in the meal, represented as a string
    ingredients: String;

    // Minimum protein content for the meal, represented as a string
    minProtein: String;

    // Maximum carbohydrate content for the meal, represented as a string
    maxCarbs: String;

    // Maximum fat content for the meal, represented as a string
    maxFat: String;

    // Maximum caloric content for the meal, represented as a string
    maxCals: String;

    // Cuisine type of the meal, represented as a string
    cuisine: String;

    // Array of dietary restrictions to consider for the meal
    diet: String[];

    // Type of the meal, represented as a string (e.g., breakfast, lunch, dinner)
    type: String;

    // Array of food intolerances to consider for the meal
    intolerances: String[];
}