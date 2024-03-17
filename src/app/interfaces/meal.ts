// Represents the details of a meal
export interface Meal {
    // Unique identifier for the meal, defined as a number
    id: number;

    // Title of the meal, represented as a string
    title: String;

    // Total caloric content of the meal, represented as a string
    cals: any;

    // Total carbohydrate content of the meal, represented as a string
    carbs: any;

    // Total protein content of the meal, represented as a string
    protein: any;

    // Total fat content of the meal, represented as a string
    fat: any;

    // Dietary information for the meal, can be of any type
    diet: any;

    // Link to an image of the meal
    image: String;
}
