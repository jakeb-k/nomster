import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Nutrient } from '../interfaces/nutrient';
import { GetRecipeDetailsService } from '../services/get-recipe-details.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-nutrients',
  templateUrl: './nutrients.page.html',
  styleUrls: ['./nutrients.page.scss'],
})
export class NutrientsPage implements OnInit {
  id!: number; 
  nutrientsArr: Nutrient[] = []; 

    
  calorieIntake = Number(sessionStorage.getItem('calorieIntake')) 

  calorieRatio = this.calorieIntake / 2000;

  constructor(private recipeDetailsGetter: GetRecipeDetailsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id')!);
    this.getNutrition(this.id);
    console.log(this.nutrientsArr)
  }
  back(): void {
    this.router.navigateByUrl('/favs', {replaceUrl:true}) 
  }
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
          }
          this.nutrientsArr.push(n)
        });
        console.log('Successful Fetch')
      },
      error: (error) => {
        console.error('Error fetching nutrition details:', error);
        // Handle error scenarios here
      }
    });
  }
}
