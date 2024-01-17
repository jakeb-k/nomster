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

  /**
   * Loads goals from the database and updates the 'goals' signal.
   */
  async loadGoals(){
    try {
      const goals = await this.db.query('SELECT * FROM goals;');
      this.goals.set(goals.values || []); 
    } 
    catch(error) {
      console.error('Error occured during goals retrieval'); 
    } 
  }
  /**
   * Retrieves the current favourites.
   * @returns The current state of the 'favs' signal.
  */
  getGoals(){
    return this.goals; 
  }

  /**
   * Loads goals from the database and updates the 'goals' signal.
   */
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
  /**
   * Deletes a goal item from the database by its ID.
   * @param id - The ID of the goal item to delete.
   * @returns Promise with the result of the query.
 */
  async deleteGoalById(id: string) {
    const query = `DELETE FROM goals WHERE id=${id}`;
  
    const result = await this.db.query(query); 
  
    this.loadGoals(); 
  
    return result; 
  }

  /**
 * Updates a goal item from the database by goalProgress and ID.
  * @param goalProgress - The amount of progress made on the goal
  * @param id - The ID of the goal item.
  * @returns Promise with the result of the query.
  */
  async updateGoal(id: number, amount:number){
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
  /**
   * Loads calorie intake goals from the database and updates the 'calorieIntake' signal.
   */
  async loadCalorieIntake(){
    try {
      // Query the database to retrieve calorie intake goals
      const calorieIntake = await this.db.query("SELECT * FROM goals WHERE type = 'Calorie Intake';");
      
      // Update the 'calorieIntake' signal with the retrieved data
      this.calorieIntake.set(calorieIntake.values || []); 
    } catch(error) {
      console.error('Error occured during goals retrieval'); 
    }
  }

  /**
   * Retrieves the current calorie intake goals.
   * @returns The current state of the 'calorieIntake' signal.
   */
  getCalorieIntake(){
    return this.calorieIntake; 
  }

}
