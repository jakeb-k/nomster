// Represents an item in a grocery list
export interface Grocery {
    // Unique identifier for the grocery item, defined as a number
    id: Number;

    // Name of the grocery item, represented as a string
    name: String;

    // Flag indicating if the grocery item is bought (1) or not bought (0), represented as a number
    isBought: Number;
}
