import { Component, OnInit, WritableSignal } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Grocery } from '../interfaces/grocery';
import { Router } from '@angular/router';


@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.page.html',
  styleUrls: ['./grocery.page.scss'],
})
export class GroceryPage implements OnInit {
  //groceries is writable signal arr of groceries
  //this is a signal between the object here and the db
  groceries!: WritableSignal<Grocery[]>; 

  //bool that controls the display of success message
  showSuccessMessage: Boolean = false 
  
  //grocery ng model, links to front end inputs
  newGrocery : Grocery = {
    id: 0,
    name: "",
    isBought: 0
  }; 

  /**
   * Initializes the component with the DatabaseService and Router.
   * @param database - Service for database operations.
   * @param router - Router for navigation.
   */
  constructor(private database: DatabaseService, private router:Router) { }

  /**
   * Loads grocery data from the database on initialization.
   */
  ngOnInit() {
    //call the sql query to db
    this.database.loadGrocery(); 
    //load the results and assign to variable
    this.groceries = this.database.getGrocery(); 
  }

  /**
   * Deletes a grocery item from the database.
   * @param grocery - The grocery item to be deleted.
   */
  async deleteGrocery(grocery: Grocery) {
    //wait for their to be response on delete grocery function
    //takes name and id as its composite primary key
    await this.database.deleteGroceryByName(grocery.name.toString(), grocery.id.toString()); 
    this.groceries = this.database.getGrocery(); 
  }

  /**
   * Adds a new grocery item to the database.
   */
  async addToGroceries() {
    //change this to auto increment
    this.newGrocery.id = this.randomIdGenerator(10000,99999)
    try {
      const isSuccess = await this.database.addGrocery(this.newGrocery); //send req to db, await the response
      if (isSuccess) {
        this.newGrocery.name = ""; 
        this.showSuccessMessage = true; // Display success message
        this.database.loadGrocery(); ///queries for all groceries from db
        this.groceries = this.database.getGrocery(); //loads them to object
        setTimeout(() => {
          this.showSuccessMessage = false; // Hide success message after a delay
        }, 1500); // Adjust the delay (in milliseconds) as needed
      }
    } catch (error) {
      console.error('Error adding grocery:', error); // log err if err

    }
  }
   /**
   * Generates a random number between specified minimum and maximum values.
   * @param min - The minimum value.
   * @param max - The maximum value.
   * @returns A random number between min and max.
   */
  randomIdGenerator(min:number,max:number) : Number {
      return Math.random() * (max - min) + min; //returns a number between the min and max
  }

  /**
   * Navigates to a specified path.
   * @param path - The path to navigate to as a string.
   */
  nav(path:string){
    this.router.navigateByUrl('/'+path); //nav by string
  }

}
