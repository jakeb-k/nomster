import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Nutrient } from '../interfaces/nutrient';
import { GetRecipeDetailsService } from '../services/get-recipe-details.service';
import { GoalsService } from '../services/goals.service';
import { Goal } from '../interfaces/goal';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nutrients',
  templateUrl: './nutrients.page.html',
  styleUrls: ['./nutrients.page.scss'],
})
export class NutrientsPage implements OnInit {

  goal:Goal | null = null; 
  // Unique identifier, typically fetched from route parameters.
  id!: number; 

  loc: string | null = ""; 
  // Array to store nutrient details, initially empty.
  nutrientsArr: Nutrient[] = []; 

  // Retrieves the user's caloric intake from session storage and converts it to a number.
  calorieIntake: any; 

  // Calculates the ratio of calorie intake to a standard 2000 calorie diet.
  calorieRatio = Number(); 

  // Holds the writable signal from db
  currentCI:any; 

  calorieIntakeSignal:any; 

  sessionCI = Number(sessionStorage.getItem('calorieIntake')) 
  /**
   * Constructor for the component.
   * @param recipeDetailsGetter - Service to get recipe details.
   * @param route - ActivatedRoute service to access route parameters.
   * @param router - Router service for navigation.
   * @param userService - Service to get user details
   */
  constructor(private recipeDetailsGetter: GetRecipeDetailsService, private route: ActivatedRoute, 
    private router: Router, private goalsService: GoalsService, private location: Location) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Retrieves the recipe ID from the route, fetches nutrition details, and logs the nutrients array.
   */
  ngOnInit() {
    this.loadGoal(); 
    this.id = Number(this.route.snapshot.paramMap.get('id')!);
    this.loc = this.route.snapshot.paramMap.get('loc');
    this.getNutrition(this.id);
  }

  async loadGoal() {
    this.goal = await this.goalsService.loadGoalByType();
    if(this.goal) {
      this.calorieRatio = this.goal!.goalAmount / 2000; 
    }
  }
  /**
   * Navigates back to the 'favs' route.
   */
  back(): void {
   this.location.back(); 
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
        console.log('Successful Nutrition Fetch');
      },
      error: (error) => {
        console.error('Error fetching nutrition details:', error);
      }
    });
  }
  
}
