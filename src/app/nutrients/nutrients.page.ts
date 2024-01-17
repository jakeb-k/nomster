import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Nutrient } from '../interfaces/nutrient';
import { GetRecipeDetailsService } from '../services/get-recipe-details.service';

@Component({
  selector: 'app-nutrients',
  templateUrl: './nutrients.page.html',
  styleUrls: ['./nutrients.page.scss'],
})
export class NutrientsPage implements OnInit {
// Unique identifier, typically fetched from route parameters.
id!: number; 

// Array to store nutrient details, initially empty.
nutrientsArr: Nutrient[] = []; 

// Retrieves the user's caloric intake from session storage and converts it to a number.
calorieIntake = Number(sessionStorage.getItem('calorieIntake')); 

// Calculates the ratio of calorie intake to a standard 2000 calorie diet.
calorieRatio = this.calorieIntake / 2000;

/**
 * Constructor for the component.
 * @param recipeDetailsGetter - Service to get recipe details.
 * @param route - ActivatedRoute service to access route parameters.
 * @param router - Router service for navigation.
 */
constructor(private recipeDetailsGetter: GetRecipeDetailsService, private route: ActivatedRoute, private router: Router) { }

/**
 * Lifecycle hook that is called after data-bound properties of a directive are initialized.
 * Retrieves the recipe ID from the route, fetches nutrition details, and logs the nutrients array.
 */
ngOnInit() {
  this.id = Number(this.route.snapshot.paramMap.get('id')!);
  this.getNutrition(this.id);
  console.log(this.nutrientsArr);
}

/**
 * Navigates back to the 'favs' route.
 */
back(): void {
  this.router.navigateByUrl('/favs', {replaceUrl: true}); 
}

/**
 * Fetches nutrition details for a given recipe ID.
 * @param id - The recipe ID for which nutrition details are to be fetched.
 */
getNutrition(id: number) {
  this.nutrientsArr = []; 
  this.recipeDetailsGetter.getRecipeNutritionDetails(id).subscribe({
    next: (newNutrients) => {
      newNutrients.nutrients.forEach((e: { name: any; amount: any; unit: any; percentOfDailyNeeds: any; }) => {
        let n: Nutrient = {
          name: e.name,
          amount: e.amount,
          unit: e.unit,
          percentOfDailyNeeds: e.percentOfDailyNeeds
        };
        this.nutrientsArr.push(n);
      });
      console.log('Successful Fetch');
    },
    error: (error) => {
      console.error('Error fetching nutrition details:', error);
    }
  });
}
}
