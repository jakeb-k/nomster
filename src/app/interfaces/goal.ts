// Represents a user's goal for nutritional intake
export interface Goal {
    // Optional unique identifier, defined as number in SQL database
    id?: number;

    // The target amount to achieve for the goal, represented as a number
    goalAmount: number;

    // Current progress towards achieving the goal, represented as a number
    goalProgress: number;

    // Type of the goal, such as 'protein intake', 'caloric intake', etc., represented as a string
    type: string;
}
