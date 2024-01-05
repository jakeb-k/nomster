export enum GoalType {
    Daily = "daily",
    LongTerm = "long-term"
}

export interface Goal {
    id: number;
    name: string;
    startPoint: number;
    endPoint: number;
    timeToComplete: number; // This could be in days, or any other unit you prefer
    type: GoalType; // Indicates whether the goal is daily or long-term
}