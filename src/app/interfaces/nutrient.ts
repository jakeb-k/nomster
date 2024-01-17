// Represents the nutritional content of a food item
export interface Nutrient {
    // Name of the nutrient, represented as a string
    name: string;

    // Amount of the nutrient present, represented as a number
    amount: number;

    // Unit of measurement for the nutrient amount, represented as a string
    unit: string;

    // Nutrient's contribution to the daily nutritional needs, represented as a percentage
    percentOfDailyNeeds: number;
}
