import { Component, OnInit } from '@angular/core';
import {GetRecipeDetailsService} from '../services/get-recipe-details.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Router } from '@angular/router';



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
  constructor(private getter: GetRecipeDetailsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id')!);
    this.getRecipeDetails(); 
    

  }
  getRecipeDetails(){
    
    this.getter.getRecipeDetails(this.id).subscribe(
      async (response) => {
        if (!response.error) {
          console.log(response); 
         this.instructions = this.formatInstructions(response.instructions);
         this.summary = this.summaryFormtter(response.summary); 
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
  summaryFormtter(summary:string){
    let cutIndex = summary.search('minutes'); 
    let newSummary = summary.slice(0, cutIndex+7);
    console.log(newSummary.length); 
    return newSummary; 
  }

  formatInstructions(text:string) {
  return text.replace(/(\d+\.) /g, '<br><br>$1');
  }



}
