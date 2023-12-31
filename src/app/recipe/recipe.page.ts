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
  id = Number(); 
  details:any;
  instructions = String(''); 
  summary = String('');
  image = String('');
  title = String('');
  ingredients:any[]=[]; 

  sortedIngredients:any[]=[];

  showSuccessMessage = Boolean(); 
  constructor(private getter: GetRecipeDetailsService, private route: ActivatedRoute, private router: Router, private database: DatabaseService) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id')!);
    this.getRecipeDetails(); 
    

  }
  getRecipeDetails(){
    
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
        console.error('Observer got an error:', err); // Log the general error
      }
    );
  }
  navHome(){  
    this.router.navigateByUrl('/'); 
  }
  summaryFormatter(summary:string){
    let cutIndex = summary.search('minutes'); 
    let newSummary = summary.slice(0, cutIndex+7);
    console.log(newSummary.length); 
    return newSummary; 
  }

  formatInstructions(text:string) {
  return text.replace(/(\d+\.) /g, '<br><br>$1');
  }

  async addToGroceries(grocery: any) {
    
   
    let newGrocery:Grocery = {
      id: grocery.id,
      name: grocery.original,
      isBought:0
    }
    try {
      const isSuccess = await this.database.addGrocery(newGrocery);
      if (isSuccess) {
        this.showSuccessMessage = true; // Display success message
        setTimeout(() => {
          this.showSuccessMessage = false; // Hide success message after a delay
        }, 3000); // Adjust the delay (in milliseconds) as needed
      } else {
        // Handle cases where addgroceryourite returns false
        // Optional: Display an error message or perform other actions
      }
    } catch (error) {
      console.error('Error adding grocery:', error);
      // Handle error scenarios here
    }

   
  }


}
