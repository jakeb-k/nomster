import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Favourite } from 'src/app/interfaces/favourite';
import { Nutrient } from 'src/app/interfaces/nutrient';
import { DatabaseService } from 'src/app/services/database.service';
import { GetRecipeDetailsService } from 'src/app/services/get-recipe-details.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent  implements OnInit {

  @Input() fav!: Favourite
  
  constructor(private database: DatabaseService, private router: Router, private recipeDetailsGetter: GetRecipeDetailsService, private modalController: ModalController) { }

  ngOnInit() {}

  async deleteFav(fav: Favourite) {
    this.database.deleteFavById(fav.id.toString()); 
  }
  recipeNav(id:Number){
    this.router.navigateByUrl('/recipe/'+id, {replaceUrl:true}); 
  }

}
