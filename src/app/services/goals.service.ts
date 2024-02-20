import { Injectable, WritableSignal, signal } from '@angular/core';

import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { DatabaseService } from './database.service';
import { Goal } from '../interfaces/goal';
import { Meal } from '../interfaces/meal';


@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  private goals: WritableSignal<Goal[]> = signal(<Goal[]>([]));

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
  * @param amount - The amount of progress made on the goal
  * @param id - The ID of the goal item.
  * @returns Promise with the result of the query.
  */
  async updateGoal(id: number, amount: number) {
    // Update goalProgress by adding amount, but do not exceed the total
    const query = `
      UPDATE goals 
      SET goalProgress = CASE 
        WHEN goalProgress + ? > goalAmount THEN goalAmount 
        ELSE goalProgress + ? 
      END 
      WHERE id = ?`;
    const params = [amount, amount, id];
    try {
      const result = await this.db.query(query, params);
      this.loadGoals(); 
      return result;
    } catch (err) {
      console.error('There was an error updating the goals', err);
      throw err;
    }
  }

  async loadGoalByType(): Promise<Goal | null> {
    try {
      const query = "SELECT * FROM goals WHERE type = ? LIMIT 1;";
      const result = await this.db.query(query, ['Calorie Intake']);
  
      // Assuming 'values' is an array of goals
      const goal = result.values && result.values.length > 0 ? result.values[0] : null;
  
      // Optionally update a signal or return the goal directly
      return goal;
    } catch (error) {
      console.error(`Error occurred during goal retrieval by type`, error);
      return null;
    }
  }

  async resetGoalProgress(id: number) {
    const query = 'UPDATE goals SET goalProgress = 0 WHERE id = ?';
    const params = [id];
    try {
      const result = await this.db.query(query, params);
      this.loadGoals(); 
      console.log('Goal progress has been reset to 0 for goal with ID:', id);
      return result;
    } catch (err) {
      console.error('There was an error resetting the goal progress', err);
      throw err;
    }
  }

  async resetAllGoalProgress() {
    const query = 'UPDATE goals SET goalProgress = 0';
    try {
      const result = await this.db.query(query);
      this.loadGoals(); 
      console.log('Goal progress has been reset to 0 for all goals');
      return result;
    } catch (err) {
      console.error('There was an error resetting the goal progress for all goals', err);
      throw err;
    }
  }
  
  async updateGoalsByMeal(meal: Meal) {
    const query = 'UPDATE goals SET goalProgress = goalProgress + ? WHERE type = ?'; 
    try {
      await this.db.query(query, [meal.cals, 'Calorie Intake']);
      await this.db.query(query, [meal.carbs, 'Carbs Limit']);
      await this.db.query(query, [meal.protein, 'Protein Intake']);
      await this.db.query(query, [meal.fat, 'Fat Limit']);
      return true
    } catch (error) {
      console.error('Error adding meal info', error)
      return false
    }
  }

  async createInitialGoals() {
    const query = 'INSERT INTO goals (type, goalAmount, goalProgress, streak) VALUES (?, ?, ?, 0)'; 
    try {
      await this.db.query(query, ['Calorie Intake',0,0,4]);
      await this.db.query(query, ['Carbs Limit',0,0,0]);
      await this.db.query(query, ['Protein Intake',0,0,0]);
      await this.db.query(query, ['Fat Limit',0,0,0]);
      return true
    } catch (error) {
      console.error('Error adding meal info', error)
      return false
    }
  }
}
