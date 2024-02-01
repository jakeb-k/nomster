import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { GoalsService } from '../services/goals.service';
import { Goal } from '../interfaces/goal';

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

 
  // Retrieves the user's caloric intake from session storage and converts it to a number.
  calorieIntake: any; 

  // Calculates the ratio of calorie intake to a standard 2000 calorie diet.
  calorieRatio = Number(); 

  // Holds the writable signal from db
  currentCI:any; 

  sessionCI = sessionStorage.getItem('calorieIntake'); 
 /**
  * Constructor for the component.
  * @param database - Service for interacting with the database.
  * @param router - Router service for navigation.
  */
 constructor(private database: DatabaseService, private router: Router, private goalsService: GoalsService) { }

 /**
  * Lifecycle hook that is called after data-bound properties of a directive are initialized.
  * Loads the grocery list from the database and assigns it to the 'groceries' property.
  */
 ngOnInit() {
   this.database.loadGrocery(); 
   this.groceries = this.database.getGrocery(); 

   this.calorieInit(); 

   console.log(this.sessionCI)
   
 }

 async calorieInit() {
  await this.goalsService.loadCalorieIntake(); 
  const calorieIntakeSignal = this.goalsService.getCalorieIntake();
  
  calorieIntakeSignal.set(this.currentCI); 
  
  
}


 /**
  * Navigates to a specified path.
  * @param path - The path to navigate to as a string.
  */
 nav(path: string) {
   this.router.navigateByUrl('/' + path); 
 }

}
