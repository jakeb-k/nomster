import { Injectable} from '@angular/core';
import { Observable, count } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Filter } from '../interfaces/filter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetRecipeService {
  query=String();
  ingredients=String(); 
  maxCals= String(); 
  maxFat= String(); 
  maxCarbs= String(); 
  minProtein= String(); 
  cuisine = String(); 
  type = String(); 
  intolerances = String(); 
  diet = String(); 

  apiKey = environment.apiKey; 
  constructor(private http: HttpClient) { }
  getRecipe(query:string): Observable<any> {
    sessionStorage.removeItem('query'); 
    sessionStorage.setItem('query',query); 

    let url = "https://api.spoonacular.com/recipes/complexSearch?query="+query+"&addRecipeNutrition=true&apiKey="+this.apiKey; 
   
    return this.http.get<any>(url)
  }
  applyFilter(filter:Filter): Observable<any> {
    

    let url = "https://api.spoonacular.com/recipes/complexSearch?addRecipeNutrition=true&apiKey="+this.apiKey; 
   
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
      this.maxCals = "&maxProtein="+Number(filter.maxFat); 
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
    url = this.removeWhitespace(url); 
    console.log(url); 
    sessionStorage.setItem('filter', JSON.stringify(filter)); 
    return this.http.get<any>(url)
  }
  removeWhitespace(text: String) {
    return text.replace(/\s+/g, '');
  }
}
