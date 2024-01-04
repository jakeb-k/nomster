import { Injectable, WritableSignal, signal } from '@angular/core';
import { Goals } from '../interfaces/goals';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { DatabaseService } from './database.service';


@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  private goals: WritableSignal<Goals[]> = signal(<Goals[]>([]));

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
      async updateGoals(goal: Number, goalType:String){
        
      }

}
