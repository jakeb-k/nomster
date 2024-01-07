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

  groceries!: WritableSignal<Grocery[]>; 

  showSuccessMessage: Boolean = false 

  newGrocery : Grocery = {
    id: 0,
    name: "",
    isBought: 0
  }; 
  constructor(private database: DatabaseService, private router:Router) { }

  ngOnInit() {
    this.database.loadGrocery(); 
    this.groceries = this.database.getGrocery(); 
  }
  IonViewWillEnter(){
    this.database.loadGrocery(); 
    this.groceries = this.database.getGrocery(); 
  }
  async deleteGrocery(grocery: Grocery) {
    await this.database.deleteGroceryByName(grocery.name.toString(), grocery.id.toString()); 
    this.groceries = this.database.getGrocery(); 
  }
  
  async addToGroceries() {
    
    this.newGrocery.id = this.randomIdGenerator(10000,99999)
    try {
      const isSuccess = await this.database.addGrocery(this.newGrocery);
      if (isSuccess) {
        this.showSuccessMessage = true; // Display success message
        this.database.loadGrocery(); 
        this.groceries = this.database.getGrocery(); 
        setTimeout(() => {
          this.showSuccessMessage = false; // Hide success message after a delay
        }, 1500); // Adjust the delay (in milliseconds) as needed
      } else {
        // Handle cases where addgroceryourite returns false
        // Optional: Display an error message or perform other actions
      }
    } catch (error) {
      console.error('Error adding grocery:', error);
      // Handle error scenarios here
    }
  }
  randomIdGenerator(min:number,max:number) : Number {
      return Math.random() * (max - min) + min;
  }
  nav(path:string){
    this.router.navigateByUrl('/'+path); 
  }

}
