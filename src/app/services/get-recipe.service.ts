import { Injectable} from '@angular/core';
import { Observable, count } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Filter } from '../interfaces/filter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetRecipeService {
/**
 * Represents the Query parameter for recipe searches.
 */
query = String();

/**
 * Represents the Ingredients parameter for recipe searches.
 */
ingredients = String();

/**
 * Represents the Maximum Calories parameter for recipe searches.
 */
maxCals = String();

/**
 * Represents the Maximum Fat parameter for recipe searches.
 */
maxFat = String();

/**
 * Represents the Maximum Carbs parameter for recipe searches.
 */
maxCarbs = String();

/**
 * Represents the Minimum Protein parameter for recipe searches.
 */
minProtein = String();

/**
 * Represents the Cuisine parameter for recipe searches.
 */
cuisine = String();

/**
 * Represents the Type parameter for recipe searches.
 */
type = String();

/**
 * Represents the Intolerances parameter for recipe searches.
 */
intolerances = String();

/**
 * Represents the Diet parameter for recipe searches.
 */
diet = String();

/**
 * The API key used for making requests to the Spoonacular API.
 */
apiKey = environment.apiKey;
  /**
   * Constructor for the RecipeService class.
   * @param http - An instance of the HttpClient class used for making HTTP requests.
   */
  constructor(private http: HttpClient) { }
  /**
   * Get a recipe based on the provided query string.
   * @param query - The query string for recipe search.
   * @returns An Observable containing recipe data.
   */
  getRecipe(query:string): Observable<any> {
    // Remove the previous query from session storage and store the new query
    sessionStorage.removeItem('query'); 

    sessionStorage.setItem('query',query); 

    // Construct the API URL for recipe search
    let url = "https://api.spoonacular.com/recipes/complexSearch?query="+query+"&addRecipeNutrition=true&apiKey="+this.apiKey; 
   
    return this.http.get<any>(url)
  }
  /**
   * Apply filters to recipe search and get matching recipes.
   * @param filter - The filter object containing search criteria.
   * @returns An Observable containing filtered recipe data.
   */
  applyFilter(filter:Filter): Observable<any> {
    
    // Construct the base API URL for recipe search
    let url = "https://api.spoonacular.com/recipes/complexSearch?addRecipeNutrition=true&apiKey="+this.apiKey; 
   
    // Apply filters to the URL if provided in the filter object
    if(filter.query != ""){
      this.query = "&query="+filter.query; 
      url = url.concat(this.query)
    }
    if(filter.ingredients != ""){
      this.ingredients = "&includeIngredients="+filter.ingredients; 
      url = url.concat(this.ingredients)
    }
    if(filter.maxCals != ""){
      this.maxCals = "&maxCalories="+Number(filter.maxCals); 
      url = url.concat(this.maxCals)
    }
    if(filter.maxCarbs != ""){
      this.maxCarbs = "&maxCarbs="+Number(filter.maxCarbs); 
      url = url.concat(this.maxCarbs)
    }
    if(filter.maxFat != ""){
      this.maxFat = "&maxFat="+Number(filter.maxFat); 
      url = url.concat(this.maxFat)
    }
    if(filter.minProtein != ""){
      this.minProtein = "&minProtein="+Number(filter.minProtein); 
      url = url.concat(this.minProtein)
    }
    if(filter.cuisine != ""){
      this.cuisine = "&cuisine="+filter.cuisine; 
      url = url.concat(this.cuisine); 
    }
    if(filter.diet.length != 0){
      this.diet = "&diet="+filter.diet.join('|');; 
      url = url.concat(this.diet); 
    }
    if(filter.type != ""){
      this.type = "&type="+filter.type; 
      url = url.concat(this.type); 
    }
    if(filter.intolerances.length != 0){
      this.intolerances = "&intolerances="+filter.intolerances.join(); 
      url = url.concat(this.intolerances); 
    }

    // Remove whitespace from the URL
    url = this.removeWhitespace(url); 
    console.log(url); 

    // Store the filter in session storage
    sessionStorage.setItem('filter', JSON.stringify(filter)); 

    // Make the HTTP request to fetch filtered recipes
    return this.http.get<any>(url)
  }

  /**
   * Removes whitespace from a given string.
   * @param text - The input text to remove whitespace from.
   * @returns The text with whitespace removed.
   */
  removeWhitespace(text: String) {
    return text.replace(/\s+/g, '');
  }
}
