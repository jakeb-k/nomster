import { Component, OnInit, ViewChild } from '@angular/core';
import {GetRecipeService} from '../services/apis/get-recipe.service';
import { DatabaseService } from '../services/database/database.service';
import { GetRecipeDetailsService } from '../services/apis/get-recipe-details.service';
import { Router } from '@angular/router';
import { Meal } from '../interfaces/meal';
import { Filter } from '../interfaces/filter';
import { Favourite } from '../interfaces/favourite';

import { IonModal, ModalController } from '@ionic/angular';
import { Nutrient } from '../interfaces/nutrient';

@Component({
  selector: 'app-home',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
}) 
export class SearchPage implements OnInit{
  
  
  @ViewChild(IonModal) modal!: IonModal;

  // Message displayed when no results are found
  message = '';

  // Array of unprocessed JSON objects from API response
  recipes:any[]=[]; 

  // Array of meals sorted into a usable format
  sortedRecipes:Meal[]=[];

  // Store for nutrient information of meals
  nutrients:any; 

  // User query for recipe search
  query = String(""); 

  // Ingredients list for recipe search
  ingredients = String(""); 

  // Index for controlling which meal is displayed in the UI slideshow
  index:any = 0; 

  // Flag to control display of meals in UI
  setLoaded: Boolean = false; 

  // Flag to display fail message
  noResults: Boolean = false; 

  // Array of raw nutrient JSON objects before sorting
  rawNutrients:any[]=[]; 

  // Array storing meals' serving sizes
  servingSize:any[]=[]; 

  // Current nutrient store, to be updated later
  nutrientsArr: Nutrient[] = []; 

  // Flag for displaying success message when a meal is saved
  showSuccessMessage:Boolean = false; 

  // Base number for nutrient table percentages, derived from user's calorie intake
  calorieIntake = Number(sessionStorage.getItem('calorieIntake')) 

  // Ratio for adjusting nutrient table based on custom caloric intake values
  calorieRatio = this.calorieIntake / 2000;

  //filter interface to be input into API
  filterOps: Filter = {
    query:"",
    ingredients:"",
    maxCals:"",
    maxCarbs:"",
    maxFat:"",
    minProtein:"",
    cuisine:"",
    diet:[],
    type:"",
    intolerances:[], 
  }
  //string arr of all available cusines to be used in filter
  cuisines: String[]= ['African','Asian','American','British','Cajun','Caribbean',
  'Chinese','Eastern European','European','French','German','Greek','Indian','Irish',
  'Italian','Japanese','Jewish','Korean','Latin American','Mediterranean','Mexican',
  'Middle Eastern','Nordic','Southern','Spanish','Thai','Vietnamese']

  //string arr of all available diets to be used in filter
  diets: String[]= ['Gluten Free', 'Ketogenic','Vegetarian','Lacto-Vegetarian', 
  'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30'];

  //string arr of all available intolerances to be used in filter
  intolerances: String[]=['Dairy','Egg','Gluten','Grain','Peanut','Seafood','Sesame',
  'Shellfish','Soy','Sulfite','Tree Nut','Wheat'];

  //string arr of all available meal types to be used in filter
  mealType: String[]=['main course','side dish','dessert','appetizer','salad','bread',
  'breakfast','soup','beverage','sauce','marinade','fingerfood','snack','drink'];


  /**
   * Initializes the HomePage component with necessary services and controllers.
   * @param recipeGetter - Service for fetching recipes.
   * @param router - Router for navigation.
   * @param modalController - Controller for managing modals.
   * @param database - Service for database operations.
   * @param recipeDetailGetter - Service for fetching detailed recipe information.
   */
  constructor(private recipeGetter: GetRecipeService, private router:Router, private modalController: ModalController, private database: DatabaseService, private recipeDetailGetter: GetRecipeDetailsService) {}
  

  /**
   * Temporary storage and retrieval of previous search results to reduce API calls.
   */
  ngOnInit(){
   
    let temp = sessionStorage.getItem('recipes');
    let temp2 = sessionStorage.getItem('nutrients');
    let temp3 = sessionStorage.getItem('servingSize'); 
  
    if(temp && temp2){
      this.setLoaded = true; 
      this.sortedRecipes = JSON.parse(temp); 
      this.rawNutrients = JSON.parse(temp2); 
      this.servingSize = JSON.parse(temp3!); 
    }
  }


  /**
   * Fetches recipes based on user query.
   */
  getRecipe(){
    //pretty sure this deprecated, honestly dont know tho 
    sessionStorage.clear(); //clears current session recipe data for new
    this.recipes = []; //clears all unsorted recipes variable info
    this.sortedRecipes = []; //clears all sorted recipes variable info
    this.rawNutrients = []; //clears all unsorted nutrients variable info
    this.servingSize = [];  //clears all serving size info

    //use recipe service to subscribe observable http response as well as input parameters for API
    this.recipeGetter.getRecipe(this.query).subscribe(
      async (response) => { //checks for response
        if (!response.error) { //if there is no problems
         this.recipes = response.results; //assigns results to variable
         this.recipeSorter(); //sorts the recipes from large json bs to something usable
        } else {
          console.error('Error:', response.error); //log assign error if error
        }
      },
      (err) => {
        console.error('Observer got an error:', err); // Log the general error
      }
    );
  }


  /**
   * Navigates to detailed recipe view.
   * @param id - The unique identifier of the recipe.
   */
  nav(id:Number){
    this.router.navigateByUrl('/recipe/'+id+'/search', {replaceUrl:true});
  }


  /**
   * Sorts and processes raw recipe data into a usable format.
   */
  recipeSorter(){
    this.rawNutrients = []; //removes previous nutrient info
    this.sortedRecipes = []; //removes previous recipe info


    this.recipes.forEach(e => { //inits loop through the returned results from
      let prot = 0; //need protein temp cus it isnt at the same index each time
      this.nutrients = e.nutrition.nutrients;   //separates nutrients from recipe info from big JSON object 
      if(String(this.nutrients[8].name == "Alcohol" ) && String(this.nutrients[9].name) == "Protein"){
        prot = this.nutrients[9].amount; //check if Alcohol is present, as it means protein is at different index
      }
      else if(String(this.nutrients[8].name == "Protein") && String(this.nutrients[9].name) != "Protein"){
        prot = this.nutrients[8].amount; //sometimes different macro at 9 so need double check
      }

      let entry:Meal = { //create new meal interface to hold the important info
        id: e.id ?? "",
        title: e.title ?? "",
        cals: String(this.nutrients[0].amount ?? ""),
        carbs: String(this.nutrients[4].amount ?? ""),
        protein: String(prot),
        fat: String(this.nutrients[1].amount ?? ""),
        diet: e.diets ?? "",
        image: e.image ?? ""
      }
      //sorted recipe is added to Meal[]
      this.sortedRecipes.push(entry); 
      //related serving size info is added to servingSize arr
      this.servingSize.push(e.nutrition.weightPerServing ?? ""); 
      //this is kinda shit, and will be updated to the improved method
      let a =  e.nutrition.nutrients;
      this.rawNutrients.push(a); 
    });

    
    if(this.sortedRecipes[0]){ //checks that there is actually something in arr before setting the vars
      this.setLoaded = true; //enables meal UI display
      let x = JSON.stringify(this.sortedRecipes); //stringify to be used in session storage
      let y = JSON.stringify(this.rawNutrients);
      let z = JSON.stringify(this.servingSize);
      sessionStorage.setItem('nutrients', y); //add to session storage for low cost fetching next time
      sessionStorage.setItem('recipes',x); 
      sessionStorage.setItem('servingSize',z); 
      
    } 
    else {
      sessionStorage.removeItem('recipes'); //clears as it is [[]] instead of just []

      //message when filter is to strong
      this.noResults = true; 
      setTimeout(() => this.noResults = false, 1500);
    }
    
  } 


  /**
   * Fetches detailed nutrition information for a specific recipe.
   * @param id - The unique identifier of the recipe.
   */
  getNutrition(id: number) {
    this.nutrientsArr = []; //clear previous held nutrients
    this.recipeDetailGetter.getRecipeNutritionDetails(id).subscribe({ //sends API request and subscribes the returned http res
      next: (newNutrients) => { //if there is something there it assigns to local arr
        //defines the variables to be used in loop
        newNutrients.nutrients.forEach((e: { name: any; amount: any; unit: any; percentOfDailyNeeds: any; }) => { 
          //assigns those variables to a nutrient interface
          let n: Nutrient = {
            name: e.name,
            amount: e.amount,
            unit: e.unit,
            percentOfDailyNeeds: e.percentOfDailyNeeds
          }
          //push into the nutrient interface array
          this.nutrientsArr.push(n)
        });
      },
      error: (error) => {
        console.error('Error fetching nutrition details:', error);
        //if API error or assign error then log it
      }
    });
  }


   /**
   * Navigates through the meal slideshow in the UI.
   * @param step - The step number to navigate the slideshow.
   */
  slideNav(step:number){
    //takes either -1 or +1 
    //controls which meal is being showed in the slideshow
    if(this.setLoaded){ //if set of meals are loaded 
      if(step >= 0 || step <= this.sortedRecipes.length -1) { //checks index is between range
      this.index = this.index + step; //add the +1 or -1 step
      } else {
        this.index = 0; //or if not in bounds set back to 0 
      }
    }
  }


  /**
   * Sends filter data for processing and updates the UI with the response.
   */
  sendFilterData() {
    //sends filter interface to be integrated into API req
    //and adds the results to variables
        this.recipeGetter.applyFilter(this.filterOps).subscribe( //need to update to next then error
          async (response) => { //if reponse
            if (!response.error) { //and no reponse error
            this.recipes = []; //empty current variable arr
            this.sortedRecipes = []; //empty current sorted variable arr
            this.recipes = response.results; //assign to unsorted recipe holder for sorting
              
            this.recipeSorter(); //the sorter function
            } 
            else if(this.recipes = []){ //if its empty
              //display the too strict filter message
              this.noResults = true; 
              setTimeout(() => this.noResults = false, 1500);
            }
            else { //if error during assignment
              console.error('Error:', response.error); //log the error
            }
          },
          (err) => { //if subscription error
            console.error('Observer got an error:', err); // Log the general error
          }
        );
  }

  /**
   * Toggles between the filter form and meal results display in the UI.
   */
  reset(){
    //controls if filter form or if meal results are shown
    this.setLoaded = !this.setLoaded; //simple bool flip
  }


  /**
   * Adds a new favourite meal to the database.
   * @param fav - The meal to be added as a favourite.
   */
  async newFav(fav: Meal) {
    //assign current displaying meal as the new fav
    fav = this.sortedRecipes[this.index]; 
    let newFav:Favourite = {
      id: fav.id,
      name: fav.title,
      pictureLink: fav.image,
      cals: fav.cals,
      carbs: fav.carbs,
      fats: fav.fat,
      protein: fav.protein
    }
    
    try {
      const isSuccess = await this.database.addFavourite(newFav);//send data to db and wait for the res
      if (isSuccess) {
        this.showSuccessMessage = true; //if successful data send
        // Display success message
        setTimeout(() => {
          this.showSuccessMessage = false; // Hide success message after a delay
        }, 3000); // Adjust the delay (in milliseconds) as needed
      } 
    } catch (error) {
      console.error('Error adding favourite:', error); //log error if error sending data
   
    }
  }

  //take recipe id and nav to nutrient page
  nutrientNav(id:number) {
    this.router.navigateByUrl('/nutrients/'+id+'/search')
  }
}
