import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { Favourite } from '../interfaces/favourite';
import { Grocery } from '../interfaces/grocery';
import { Goal } from '../interfaces/goal';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const DB_FAVS = 'favsdb'; 



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  // SQLiteConnection instance for interacting with SQLite database
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite); 
  // Connection to a specific SQLite database
  private db!: SQLiteDBConnection;

  // Signals for reactive state management of users
  private users: WritableSignal<User[]> = signal(<User[]>([])); 

  // Signals for reactive state management of favourites
  private favs: WritableSignal<Favourite[]> = signal(<Favourite[]>([]));

  // Signals for reactive state management of groceries
  private groceries: WritableSignal<Grocery[]> = signal(<Grocery[]>([]));

  // Signals for reactive state management of goals
  public goals: WritableSignal<Goal[]> = signal(<Goal[]>([]));

  constructor() { }

  /**
 * Initializes the SQLite connection and database.
 * @returns A boolean indicating whether the initialization was successful.
 */
  async initializePlugin(){

      //creates the connection and assigns to variable
      this.db = await this.sqlite.createConnection(
      DB_FAVS,
      false,
      'no-encryption',
      1,
      false
    ); 

    //waits for the connection to be active
    await this.db.open(); 
      
    //sql favourites schema create query
    const schemaFavs = `CREATE TABLE IF NOT EXISTS favourites ( 
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      pictureLink TEXT NOT NULL,
      carbs TEXT NOT NULL,
      cals TEXT NOT NULL,
      fats TEXT NOT NULL,
      protein TEXT NOT NULL
      );`

    //sql groceries schema create query
    const schemaGroceries = `
      CREATE TABLE IF NOT EXISTS groceries (
        id INTEGER,
        name TEXT NOT NULL,
        isBought INTEGER DEFAULT 0,
        PRIMARY KEY (id, name)
      );
    `

    //sql goals schema create query
    const schemaGoals = `
      CREATE TABLE IF NOT EXISTS goals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        goalAmount INTEGER NOT NULL,
        goalProgress INTEGER DEFAULT 0,
        type TEXT NOT NULL

      );
    `

    //sql users schema create query
    const schemaUsers = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        gender INTEGER NOT NULL,
        height INTEGER NOT NULL,
        weight INTEGER NOT NULL,
        direction INTEGER NOT NULL,
        age INTEGER NOT NULL,
        activityLevel INTEGER NOT NULL

      );
    `



    //await func that execute the sql create queries
    await this.db.execute(schemaFavs);

    await this.db.execute(schemaGroceries);

    await this.db.execute(schemaGoals);  

    await this.db.execute(schemaUsers);  
    
    return true; 

  }

  /**
 * Retrieves the current database connection.
 * @returns The SQLiteDBConnection instance.
 */
  getDatabase(){
    return this.db; 
  }

 /**
   * Adds a new favourite item to the database.
   * Handles UNIQUE constraint violations by deleting existing entry.
   * @param favourite - The Favourite object to be added to the database.
   * @returns Promise with the result of the query.
 */
  async addFavourite(favourite: Favourite) {
    const { id, name, pictureLink, cals, carbs, protein, fats } = favourite;
    const query = `INSERT INTO favourites (id, name, pictureLink, carbs, cals, fats, protein) VALUES (${id}, '${name}', '${pictureLink}', '${cals}', '${carbs}', '${protein}', '${fats}')`;
  
    try {
      const result = await this.db.query(query);
      return result;
    } catch (error: any) {
      // Handle UNIQUE constraint violation
      if (error.message.includes('UNIQUE constraint failed')) {
        // Perform a DELETE operation for the conflicting id
        const deleteQuery = `DELETE FROM favourites WHERE id = ${id}`;
        try {
          const deleteResult = await this.db.query(deleteQuery);
          // Optional: Reload or update your data after the deletion
          this.loadFavs(); // Adjust this according to your application flow
          return deleteResult;
        } catch (deleteError) {
          console.error('Error deleting conflicting entry:', deleteError);
          throw deleteError; // Handle the deletion error according to your requirements
        }
      } else {
        // Handle other types of errors
        console.error('Error adding favourite:', error);
        throw error; // Handle the error according to your requirements
      }
    }
  }

  /**
   * Loads favourites from the database and updates the 'favs' signal.
   */
  async loadFavs(){
    try {
      const favs = await this.db.query('SELECT * FROM favourites;');

      this.favs.set(favs.values || []); 
    } catch(error) {
      console.error('Error occured during retrieval'); 
    }
   
  }
  /**
   * Retrieves the current favourites.
   * @returns The current state of the 'favs' signal.
  */
  getFavs() {
    return this.favs; 
  }
  /**
   * Deletes a favourite item from the database by its ID.
   * @param id - The ID of the favourite item to delete.
   * @returns Promise with the result of the query.
 */
  async deleteFavById(id: string) {
    const query = `DELETE FROM favourites WHERE id=${id}`;

    const result = await this.db.query(query); 

    this.loadFavs(); 

    return result; 
  }


  /**
   * Adds a new grocery item to the database.
   * Handles UNIQUE constraint violations as in 'addFavourite'.
   * @param grocery - The Grocery object to be added to the database.
   * @returns Promise with the result of the query.
   */
  async addGrocery(grocery: Grocery) {
    const { id, name, isBought } = grocery;
    const query = `INSERT INTO groceries (id, name, isBought) VALUES (${id}, '${name}', '${isBought}')`;
  
    try {
        const result = await this.db.query(query);
        return result;
      } catch (error: any) {
        // Handle UNIQUE constraint violation
        if (error.message.includes('UNIQUE constraint failed')) {
          // Perform a DELETE operation for the conflicting id
          const deleteQuery = `DELETE FROM groceries WHERE id = ${id}`;
          try {
            const deleteResult = await this.db.query(deleteQuery);
            // Optional: Reload or update your data after the deletion
            this.loadGrocery(); // Adjust this according to your application flow
            return deleteResult;
          } catch (deleteError) {
            console.error('Error deleting conflicting entry:', deleteError);
            throw deleteError; // Handle the deletion error according to your requirements
          }
        } else {
          // Handle other types of errors
          console.error('Error adding favourite:', error);
          throw error; // Handle the error according to your requirements
        }
      }
    }
  

  /**
   * Loads groceries from the database and updates the 'groceries' signal.
   */
  async loadGrocery(){
    try {
      const groceries = await this.db.query('SELECT * FROM groceries;');

      this.groceries.set(groceries.values || []); 
    } catch(error) {
      console.error('Error occured during retrieval'); 
    }
   
  }
  
  /**
 * Retrieves the current groceries.
 * @returns The current state of the 'groceries' signal.
 */
  getGrocery() {
    return this.groceries; 
  }

  /**
   * Deletes a grocery item from the database by name and ID.
   * @param name - The name of the grocery item.
   * @param id - The ID of the grocery item.
   * @returns Promise with the result of the query.
   */
  async deleteGroceryByName(name: string, id:string) {
    const query = `DELETE FROM groceries WHERE name=? AND id=?`;
    const params = [name, id] 
    const result = await this.db.query(query, params); 

    this.loadGrocery(); 

    return result; 
  }

  /**
   * Loads goals from the database and updates the 'goals' signal.
   */
  async loadGoals(){
    try {
      const goals = await this.db.query('SELECT * FROM goals;');
  
      this.goals.set(goals.values || []); 
    } catch(error) {
      console.error('Error occured during goals retrieval'); 
    }
  }

  /**
   * Retrieves the current goals.
   * @returns The current state of the 'goals' signal.
   */
  getGoals(){
    return this.goals; 
  }


//CRUD USERS (EXAMPLE)
  //read users
  getUsers(){
    return this.users;
  }

  async loadUsers(){
    try {
      const users = await this.db.query('SELECT * FROM users;');

      this.users.set(users.values || []); 
    } catch(error) {
      console.error('Error occured during retrieval'); 
    }
   
  }
  
  //create users
  async addUser(name:string){
    const query = `INSERT INTO users (name) VALUES ('${name}')`;

    const result = await this.db.query(query); 

    this.loadUsers(); 

    return result; 
  }

  //update users
  async updateUserById(id: string, active:number) {
    const query = `UPDATE users SET active=${active} WHERE id=${id}`;

    const result = await this.db.query(query); 

    this.loadUsers(); 

    return result; 
  }
  
  //delete users
  async deleteUserById(id: string) {
    const query = `DELETE FROM users WHERE id=${id}`;

    const result = await this.db.query(query); 

    this.loadUsers(); 

    return result; 
  }




}
