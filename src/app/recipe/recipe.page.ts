import { Component, OnInit } from '@angular/core';
import {GetRecipeDetailsService} from '../services/get-recipe-details.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Grocery } from '../interfaces/grocery';



@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
// Property to store the ID of the recipe, initialized to a number
id = Number(); 

// Property to hold recipe details; type is any
details: any;

// String properties to store recipe information
instructions = String(''); 
summary = String('');
image = String('');
title = String('');

// Array to store recipe ingredients
ingredients: any[] = []; 

// Array to store sorted ingredients; currently unused
sortedIngredients: any[] = [];

// Flag to show or hide the success message
showSuccessMessage = Boolean(); 

/**
 * Constructor for the component.
 * @param getter - Service to get recipe details.
 * @param route - ActivatedRoute service to access route parameters.
 * @param router - Router service for navigation.
 * @param database - Service to interact with the database.
 */
constructor(private getter: GetRecipeDetailsService, private route: ActivatedRoute, private router: Router, private database: DatabaseService) { }

/**
 * Lifecycle hook that is called after data-bound properties of a directive are initialized.
 * Fetches recipe details based on the recipe ID.
 */
ngOnInit() {
  this.id = Number(this.route.snapshot.paramMap.get('id')!);
  this.getRecipeDetails();
}

/**
 * Fetches recipe details and assigns them to component properties.
 */
getRecipeDetails() {
  this.getter.getRecipeDetails(this.id).subscribe(
    async (response) => {
      if (!response.error) {
        this.instructions = this.formatInstructions(response.instructions);
        this.summary = this.summaryFormatter(response.summary); 
        this.image = response.image; 
        this.title = response.title; 
        this.ingredients = response.extendedIngredients;  
      } else {
        console.error('Error:', response.error); 
      }
    },
    (err) => {
      console.error('Observer got an error:', err);
    }
  );
}

/**
 * Navigates to the home route.
 */
navHome() {  
  this.router.navigateByUrl('/'); 
}

/**
 * Formats the summary by cutting it off after 'minutes'.
 * @param summary - The summary string to format.
 * @returns The formatted summary.
 */
summaryFormatter(summary: string) {
  let cutIndex = summary.search('minutes'); 
  let newSummary = summary.slice(0, cutIndex + 7);
  
  return newSummary; 
}

/**
 * Formats the instructions text by adding breaks before numbers.
 * @param text - The instructions text to format.
 * @returns The formatted instructions.
 */
formatInstructions(text: string) {
  return text.replace(/(\d+\.) /g, '<br><br>$1');
}

/**
 * Adds a grocery item to the database and handles the response.
 * @param grocery - The grocery item to add.
 */
async addToGroceries(grocery: any) {
  let newGrocery: Grocery = {
    id: grocery.id,
    name: grocery.original,
    isBought: 0
  };
  try {
    const isSuccess = await this.database.addGrocery(newGrocery);
    if (isSuccess) {
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 1000);
    } else {
      // Handle cases where addGrocery returns false
    }
  } catch (error) {
    console.error('Error adding grocery:', error);
  }
}

}
