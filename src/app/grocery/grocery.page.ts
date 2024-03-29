import { Component, OnInit, WritableSignal, ChangeDetectorRef } from '@angular/core';
import { DatabaseService } from '../services/database/database.service';
import { Grocery } from '../interfaces/grocery';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.page.html',
  styleUrls: ['./grocery.page.scss'],
})
export class GroceryPage implements OnInit {
  //groceries is writable signal arr of groceries
  //this is a signal between the object here and the db
  groceriesArr!: WritableSignal<Grocery[]>; 

  groceries: Grocery[] = []; 

  //bool that controls the display of success message
  showSuccessMessage: Boolean = false 
  
  //grocery ng model, links to front end inputs
  newGrocery : Grocery = {
    id: 0,
    name: "",
    isBought: 0,
    aisle: ""
  }; 
   aisles: String[] = ["Healthy & Specialty Foods", "Pantry Essentials", "Bakery & Sweet Snacks",
  "Frozen & Refrigerated", "Snacks", "Dairy and Eggs", "Beverages", "Meat & Seafood", "Produce"]

  expandedAisles: { [key: string]: boolean } = {};
  /**
   * Initializes the component with the DatabaseService and Router.
   * @param database - Service for database operations.
   * @param router - Router for navigation.
   */
  constructor(private database: DatabaseService, private router:Router, 
    private cdr: ChangeDetectorRef, private modalController: ModalController) { }

  /**
   * Loads grocery data from the database on initialization.
   */
  async ngOnInit() {
    //call the sql query to db
    await this.database.loadGrocery(); 
    //load the results and assign to variable
    this.groceriesArr = this.database.getGrocery();     
    this.groceries = this.groceriesArr(); 
    
  }

  /**
   * Deletes a grocery item from the database.
   * @param grocery - The grocery item to be deleted.
   */
  async deleteGrocery(grocery: Grocery) {
    try {
      await this.database.deleteGrocery(grocery.name.toString()); 
      await this.database.loadGrocery() 
      this.groceriesArr = this.database.getGrocery(); 
      this.groceries =  this.groceriesArr()
    } catch(error) {
      console.error('Error deleting grocery: ', error)
    }
    this.cdr.detectChanges();
  }

  /**
   * Adds a new grocery item to the database.
   */
  async addToGroceries() {
   
    this.newGrocery.id = this.randomIdGenerator(10000,99999)
    try {
      const isSuccess = await this.database.addGrocery(this.newGrocery); //send req to db, await the response
      await this.database.loadGrocery(); ///queries for all groceries from db
      this.groceriesArr = this.database.getGrocery(); //loads them to object
      this.groceries = this.groceriesArr()
      this.cdr.detectChanges();
      if (isSuccess) {
        this.newGrocery.name = ""; 
        this.showSuccessMessage = true; // Display success message
        setTimeout(() => {
          this.showSuccessMessage = false; // Hide success message after a delay
        }, 1500); // Adjust the delay (in milliseconds) as needed
      }
      
    } catch (error) {
      console.error('Error adding grocery:', error); // log err if err
    }
    this.cdr.detectChanges();
    this.cancel(); 
    
  }
  async deleteAllGroceries() {
    try {
      await this.database.deleteAllGroceries(); 
      await this.database.loadGrocery() 
      this.groceriesArr = this.database.getGrocery(); 
      this.groceries =  this.groceriesArr()
      this.cdr.detectChanges();
    } catch (error) {
      console.error('error deleting groceries page: ', error)
    }
  }
  load() {
    this.cdr.detectChanges();
  }
   /**
   * Generates a random number between specified minimum and maximum values.
   * @param min - The minimum value.
   * @param max - The maximum value.
   * @returns A random number between min and max.
   */
  randomIdGenerator(min:number,max:number) : number {
      return Math.random() * (max - min) + min; //returns a number between the min and max
  }

  /**
   * Navigates to a specified path.
   * @param path - The path to navigate to as a string.
   */
  nav(path:string){
    this.router.navigateByUrl('/'+path); //nav by string
  }

  /**
  * Handles the cancellation of the modal view.
  */
  cancel() {
    //removes the modal from screen
    this.modalController.dismiss(null, 'cancel');
    this.cdr.detectChanges();
  }

  /**
   * Controls expanding of aisles
   * @param aisle - The aisle to be un/expanded
   */
  toggleAisle(aisle: string) {
    this.expandedAisles[aisle] = !this.expandedAisles[aisle];
  }
  
}
