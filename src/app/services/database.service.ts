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

  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite); 
  private db!: SQLiteDBConnection;

  private users: WritableSignal<User[]> = signal(<User[]>([])); 

  private favs: WritableSignal<Favourite[]> = signal(<Favourite[]>([]));

  private groceries: WritableSignal<Grocery[]> = signal(<Grocery[]>([]));

  public goals: WritableSignal<Goal[]> = signal(<Goal[]>([]));


  constructor() { }

  //create connection to sqlite database
  async initializePlugin(){

    
      this.db = await this.sqlite.createConnection(
      DB_FAVS,
      false,
      'no-encryption',
      1,
      false
    ); 

    await this.db.open(); 

    const schemaFavs = `CREATE TABLE IF NOT EXISTS favourites ( 
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      pictureLink TEXT NOT NULL
      );`

    const schemaGroceries = `
      CREATE TABLE IF NOT EXISTS groceries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        isBought INTEGER DEFAULT 0
      );
    `
    const schemaGoals = `
      CREATE TABLE IF NOT EXISTS goals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        goalAmount INTEGER NOT NULL,
        type TEXT NOT NULL

      );
    `

    await this.db.execute(schemaFavs);

    await this.db.execute(schemaGroceries);

    await this.db.execute(schemaGoals);  

    this.loadFavs(); 

    this.loadGrocery(); 

    this.loadGoals();

    return true; 

  }
  getDatabase(){
    return this.db; 
  }

  //CRUD FAVS
  async addFavourite(favourite: Favourite) {
    const { id, name, pictureLink } = favourite;
    const query = `INSERT INTO favourites (id, name, pictureLink) VALUES (${id}, '${name}', '${pictureLink}')`;
  
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


  //LOAD FAVS FROM DB
  async loadFavs(){
    try {
      const favs = await this.db.query('SELECT * FROM favourites;');

      this.favs.set(favs.values || []); 
    } catch(error) {
      console.error('Error occured during retrieval'); 
    }
   
  }
  //RETURN FAVS OBJECT
  getFavs() {
    return this.favs; 
  }
  //delete favs
  async deleteFavById(id: string) {
    const query = `DELETE FROM favourites WHERE id=${id}`;

    const result = await this.db.query(query); 

    this.loadFavs(); 

    return result; 
  }


  // SHOPPING LIST CRUD

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
  

  //LOAD FAVS FROM DB
  async loadGrocery(){
    try {
      const groceries = await this.db.query('SELECT * FROM groceries;');

      this.groceries.set(groceries.values || []); 
    } catch(error) {
      console.error('Error occured during retrieval'); 
    }
   
  }
  //RETURN FAVS OBJECT
  getGrocery() {
    return this.groceries; 
  }


  //delete grocery
  async deleteGroceryById(id: string) {
    const query = `DELETE FROM groceries WHERE id=${id}`;

    const result = await this.db.query(query); 

    this.loadGrocery(); 

    return result; 
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

}
