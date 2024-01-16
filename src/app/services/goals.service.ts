import { Injectable, WritableSignal, signal } from '@angular/core';

import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { DatabaseService } from './database.service';
import { Goal } from '../interfaces/goal';


@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  private goals: WritableSignal<Goal[]> = signal(<Goal[]>([]));

  private calorieIntake: WritableSignal<Goal[]> = signal(<Goal[]>([]));
  constructor(private databaseService: DatabaseService) { }

  private get db(): SQLiteDBConnection {
    return this.databaseService.getDatabase();
  }

      //LOAD GOALS FROM DB
      async loadGoals(){
        try {
          const goals = await this.db.query('SELECT * FROM goals;');
    
          this.goals.set(goals.values || []); 
        } catch(error) {
          console.error('Error occured during goals retrieval'); 
        }
       
      }
      getGoals(){
        return this.goals; 
      }
     // Function to add a new goal
    async addGoal(goal: Goal): Promise<any> {
      
      // Using parameterized query for safe SQL execution
      const query = `INSERT INTO Goals (type, goalAmount, goalProgress) VALUES (?, ?, ?)`;
      const params = [goal.type, goal.goalAmount, 0];

      try {
          const result = await this.db.query(query, params);
          this.loadGoals(); // Function to refresh or reload the goals data
          return result;
      } catch (error: any) {
          console.error('Error adding goal:', error);
          throw error; // Proper error handling
      }
    }

    async deleteGoalById(id: string) {
      const query = `DELETE FROM goals WHERE id=${id}`;
  
      const result = await this.db.query(query); 
  
      this.loadGoals(); 
  
      return result; 
    }
    async updateGoal(id: number, amount:number){
      //query to update goal progress, need id to access and new value
      const query = 'UPDATE goals SET goalProgress = ? WHERE id = ?';
      const params = [amount, id]
      try {
        const result = await this.db.query(query, params);
        this.loadGoals()
        return result
      } catch(err) {
        console.error('There was an error updating the goals', err)
        throw err
      }
    }
    
    async loadCalorieIntake(){
      try {
        const calorieIntake = await this.db.query("SELECT * FROM goals WHERE type = 'Calorie Intake';");
        this.calorieIntake.set(calorieIntake.values || []); 
      } catch(error) {
        console.error('Error occured during goals retrieval'); 
      }
    }
    getCalorieIntake(){
      return this.calorieIntake; 
    }

}
