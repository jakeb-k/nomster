import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarcodeFetchService {


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
   getProductInfo(id:Number): Observable<any> {
     // Construct the API URL for retrieving recipe details
     let url = "https://world.openfoodfacts.org/api/v0/product/"+id+".json"
     console.log(url); 
     return this.http.get<any>(url)
   }
 
}
