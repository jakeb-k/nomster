import { Injectable } from '@angular/core';
import { Observable, count } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetRecipeDetailsService {
  apiKey = environment.apiKey; 

  constructor(private http: HttpClient) { }
  getRecipeDetails(id:Number): Observable<any> {
    let url = "https://api.spoonacular.com/recipes/"+id+"/information?apiKey="+this.apiKey; 
    
    return this.http.get<any>(url)
  }
  getRecipeNutritionDetails(id:Number): Observable<any> {
    let url = "https://api.spoonacular.com/recipes/"+id+"/nutritionWidget.json?apiKey="+this.apiKey;

    return this.http.get<any>(url); 
  }
}
