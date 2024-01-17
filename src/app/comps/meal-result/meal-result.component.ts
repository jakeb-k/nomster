import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'meal-result',
  templateUrl: './meal-result.component.html',
  styleUrls: ['./meal-result.component.scss'],
})
export class MealResultComponent  implements OnInit {
  //should probably rework this to take in singular meal object
  @Input() carbs!: String;
  @Input() cals!: String;
  @Input() fat!: String;
  @Input() protein!: String;
  @Input() id!: Number;
  @Input() image!: String;
  @Input() title!: String;

  constructor(private router: Router) { }

  ngOnInit() {}
  recipeNav(id:Number){
  //nav based off the recipe ID, allows for specific API req for that recipe
    this.router.navigateByUrl('/recipe/'+id, {replaceUrl:true}); 
  }

}
