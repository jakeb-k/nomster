import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { GoalsService } from '../services/goals.service';
import { Goal } from '../interfaces/goal';
import { UserService } from '../services/user.service';

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

  goal:any; 
 
  user:any;
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
 constructor(private router: Router, private goalsService: GoalsService, private userService:UserService) { }

 /**
  * Lifecycle hook that is called after data-bound properties of a directive are initialized.
  * Loads the grocery list from the database and assigns it to the 'groceries' property.
  */
 async ngOnInit() {
  this.goal = await this.goalsService.loadGoalByType();
  this.user = await this.userService.loadUserByPromise(); 
  sessionStorage.setItem('previous', 'true'); 
  
 }


 /**
  * Navigates to a specified path.
  * @param path - The path to navigate to as a string.
  */
 nav(path: string) {
   this.router.navigateByUrl('/' + path); 
 }

}
