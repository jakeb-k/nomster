import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const DB_USERS = 'myuserdb'; 



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite); 
  private db!: SQLiteDBConnection;

  private users: WritableSignal<User[]> = signal(<User[]>([])); 
  constructor() { }

  //create connection to sqlite database
  async initializePlugin(){

    
      this.db = await this.sqlite.createConnection(
      DB_USERS,
      false,
      'no-encryption',
      1,
      false
    ); 

    await this.db.open(); 

    const schema = `CREATE TABLE IF NOT EXISTS users ( 
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      active INTEGER DEFAULT 1
      );`
      
      await this.db.execute(schema);
      await this.addUser('Jimmy Crickets'); 
      this.loadUsers(); 

      return true; 
   


  }

  //CRUD

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
