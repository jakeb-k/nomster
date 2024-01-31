import { Injectable, signal, WritableSignal } from '@angular/core';
import { DatabaseService } from './database.service';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: WritableSignal<User> = signal(<User>({}));



  constructor(private databaseService: DatabaseService) { }

  private get db(): SQLiteDBConnection {
    return this.databaseService.getDatabase();
  }

  /**
   * Loads users from the database and updates the 'users' signal.
   */
  async loadUsers(){
    try {
      const users = await this.db.query('SELECT * FROM users;');
      if (users.values && users.values.length > 0) {
        this.user.set(users.values[0]); // Set the first user
      }
    } 
    catch(error) {
      console.error('Error occured during users retrieval'); 
    } 
  }
  /**
   * Retrieves the current favourites.
   * @returns The current state of the 'users' signal.
  */
  getUsers(){
    return this.user; 
  }

   /**
   * Loads users from the database and updates the 'users' signal.
   */
   async addUser(user: User): Promise<any> {  
    // Using parameterized query for safe SQL execution
    const query = `INSERT INTO users (name, gender, height, weight, direction, age, activityLevel) 
                                      VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [user.name, user.gender, user.height, user.weight,user.direction, 
      user.age,user.activityLevel,];
      
    try {
        const result = await this.db.query(query, params);
        this.loadUsers(); // Function to refresh or reload the users data
        return result;
    } catch (error: any) {
        console.error('Error adding user:', error);
        throw error; // Proper error handling
    }
  }

}
