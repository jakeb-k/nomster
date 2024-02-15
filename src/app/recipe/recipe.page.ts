import { Component, OnInit } from '@angular/core';
import {GetRecipeDetailsService} from '../services/get-recipe-details.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Grocery } from '../interfaces/grocery';
import { GoalsService } from '../services/goals.service';
import { Meal } from '../interfaces/meal';



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

  // Flag to show or hide the success message
  showMealMessage = Boolean(); 

  nutri!: Meal; 

  instrucs:any; 

  timeToCook:any; 
  serving:any; 
  likes:any;
  source = {
    name:"",
    link:""
  }; 

  isLoaded = false; 
  isExpanded = false; 

  selectedDiv: string = 'first';

  selectedInstruction: number = 0;

  loc:any; 

  lastAddedGrocery!: Grocery | null;

  /**
   * Constructor for the component.
   * @param getter - Service to get recipe details.
   * @param route - ActivatedRoute service to access route parameters.
   * @param router - Router service for navigation.
   * @param database - Service to interact with the database.
   * @param goalsService - Service to interact with goals table in the database
   */
  constructor(private getter: GetRecipeDetailsService, private route: ActivatedRoute, private router: Router, 
    private database: DatabaseService, private goalsService: GoalsService) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Fetches recipe details based on the recipe ID.
   */
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id')!);
    this.loc = this.route.snapshot.paramMap.get('loc');
    this.getRecipeDetails();
    this.getUnderlinePosition(); 
  }

  /**
   * Fetches recipe details and assigns them to component properties.
   */
  getRecipeDetails() {
    this.getter.getRecipeDetails(this.id).subscribe(
      async (response) => {
        if (!response.error) {
          console.log(response);
          this.likes = response.aggregateLikes
          this.timeToCook = response.readyInMinutes
          this.serving = response.servings
          this.source.link = response.sourceUrl 
          this.source.name = response.sourceName

          this.summary = response.summary
          
          this.image = response.image; 
          this.title = response.title; 
          this.ingredients = response.extendedIngredients;  
          this.instrucs = response.analyzedInstructions[0].steps;
          this.nutri = this.nutrientSorter(response.nutrition.nutrients); 
          this.isLoaded = true; 
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
    this.router.navigateByUrl('/'+this.loc); 
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
        this.lastAddedGrocery = newGrocery 
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 1500);
      } else {
        // Handle cases where addGrocery returns false
      }
    } catch (error) {
      console.error('Error adding grocery:', error);
    }
  }
  nutrientSorter(nutrients:any) {
    console.log(nutrients)
    let prot:any; 
    if(String(nutrients[8].name == "Alcohol" ) && String(nutrients[9].name) == "Protein"){
      prot = nutrients[9].amount; //check if Alcohol is present, as it means protein is at different index
    }
    else if(String(nutrients[8].name == "Protein") && String(nutrients[9].name) != "Protein"){
      prot = nutrients[8].amount; //sometimes different macro at 9 so need double check
    }

    let entry:Meal = { //create new meal interface to hold the important info
      id: 5318008,
      title:"temp",
      cals: String(nutrients[0].amount ?? ""),
      carbs: String(nutrients[4].amount ?? ""),
      protein: String(prot),
      fat: String(nutrients[1].amount ?? ""),
      diet: "temp",
      image: "temp"
    }
    return entry; 
  }
  async updateGoalsByMeal() {
    try {
      const mealSuccess = await this.goalsService.updateGoalsByMeal(this.nutri); 
      if (mealSuccess) {
        this.showMealMessage = true;
        setTimeout(() => this.showMealMessage = false, 1500);
      } 
    }catch (error) {
      console.error('Error tracking by meal:', error)
    }
  }

  readMoreToggle(){
    this.isExpanded = !this.isExpanded
  }
  getUnderlinePosition(): string {
    // Adjust these values based on your titles' actual sizes and spacing
    const underlineWidthFirst = 100; // Width of the underline for the first title
    const underlineWidthSecond = 100; // Width of the underline for the second title
    const positionFirst = 'translateX(0px)';
    const positionSecond = `translateX(${underlineWidthFirst}%)`; // Adjust translation based on your layout

    return this.selectedDiv === 'first' ? positionFirst : positionSecond;
  }
  selectInstruction(index: number): void {
    this.selectedInstruction = index;
  }
  shouldBeFaded(index: number): boolean {
    return index < this.selectedInstruction;
  }
  getIconName(index: number): string {
    if (index < this.selectedInstruction) {
      return 'checkmark-circle'; // Example: icon name when instruction is completed or passed
    } else {
      return 'ellipse-outline'; // Example: icon name for current or future instructions
    }
  }
  
}
