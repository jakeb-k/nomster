
export interface Goal {
    id?: number;
    goalAmount: number;
    goalProgress: number; 
    type: string; // Indicates whether the goal is daily or long-term
}