import { Injectable } from '@angular/core';
import { Observable, count } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetRecipeDetailsService {
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
   * Get detailed information about a recipe by its ID.
   * @param id - The ID of the recipe to retrieve details for.
   * @returns An Observable containing recipe details.
   */
  getRecipeDetails(id:Number): Observable<any> {
    // Construct the API URL for retrieving recipe details
    let url = "https://api.spoonacular.com/recipes/"+id+"/information?apiKey="+this.apiKey; 
    
    return this.http.get<any>(url)
  }

  /**
   * Get nutrition details for a recipe by its ID.
   * @param id - The ID of the recipe to retrieve nutrition details for.
   * @returns An Observable containing nutrition details.
   */
  getRecipeNutritionDetails(id:Number): Observable<any> {
    // Construct the API URL for retrieving nutrition details
    let url = "https://api.spoonacular.com/recipes/"+id+"/nutritionWidget.json?apiKey="+this.apiKey;

    return this.http.get<any>(url); 
  }
}
