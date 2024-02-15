import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'meal-result',
  templateUrl: './meal-result.component.html',
  styleUrls: ['./meal-result.component.scss'],
})
export class MealResultComponent  implements OnInit {
   // Inputs for various nutritional and recipe details
   @Input() carbs!: String;
   @Input() cals!: String;
   @Input() fat!: String;
   @Input() protein!: String;
   @Input() id!: Number;
   @Input() image!: String;
   @Input() title!: String;
 
  /**
  * Initializes the component with the Router.
  * @param router - Router for navigation.
  */
  constructor(private router: Router) { }

  ngOnInit() {}

  /**
   * Navigates to the recipe details page based on the recipe ID.
   * Facilitates specific API requests for detailed recipe information.
   * @param id - The unique identifier of the recipe.
   */
  recipeNav(id:Number){
    this.router.navigateByUrl('/recipe/'+id+'/search', {replaceUrl:true}); 
  }

}
