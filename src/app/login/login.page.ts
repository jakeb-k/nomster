import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CameraService } from '../services/camera.service';

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

  options = [
    ['Search Recipes', 'search','search-circle-outline'],
    ['Favourites', 'favs','heart-circle-outline'],
    ['Grocery List', 'grocery','cart'],
    ['My Goals', 'profile-input','ribbon-outline'],
    ['Update Profile', 'onboarding','cog-outline'],
  ]

 /**
  * Constructor for the component.
  * @param database - Service for interacting with the database.
  * @param router - Router service for navigation.
  * @param camera - Camera service for profile picture
  */
 constructor(private router: Router, private userService:UserService, private cameraService: CameraService) { }

 /**
  * Lifecycle hook that is called after data-bound properties of a directive are initialized.
  * Loads the grocery list from the database and assigns it to the 'groceries' property.
  */
 async ngOnInit() {
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
