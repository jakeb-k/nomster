import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 // Property to store the grocery list; type is any
 groceries: any; 

 // Property to store the new user's name as a string
 newUserName = ''; 

 // Retrieves and stores the user's calorie intake from session storage
 calorieIntake = sessionStorage.getItem('calorieIntake'); 

 /**
  * Constructor for the component.
  * @param database - Service for interacting with the database.
  * @param router - Router service for navigation.
  */
 constructor(private database: DatabaseService, private router: Router) { }

 /**
  * Lifecycle hook that is called after data-bound properties of a directive are initialized.
  * Loads the grocery list from the database and assigns it to the 'groceries' property.
  */
 ngOnInit() {
   this.database.loadGrocery(); 
   this.groceries = this.database.getGrocery(); 
 }

 /**
  * Navigates to a specified path.
  * @param path - The path to navigate to as a string.
  */
 nav(path: string) {
   this.router.navigateByUrl('/' + path); 
 }

}
