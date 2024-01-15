import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Favourite } from '../interfaces/favourite';
import { Router } from '@angular/router';
import { Nutrient } from '../interfaces/nutrient';
import { GetRecipeDetailsService } from '../services/get-recipe-details.service';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.page.html',
  styleUrls: ['./favs.page.scss'],
})
export class FavsPage implements OnInit {

  favs: any;



  nutrientsArr: Nutrient[] = []; 

  constructor(private database: DatabaseService, private router: Router, private recipeDetailsGetter: GetRecipeDetailsService) { }

  ngOnInit() {
    try {
      this.database.loadFavs(); 
      this.favs = this.database.getFavs(); 
    } catch (err) {
      console.log(err)
    }

  }
  async deleteFav(fav: Favourite) {
    this.database.deleteFavById(fav.id.toString()); 
  }
  recipeNav(id:Number){
    this.router.navigateByUrl('/recipe/'+id, {replaceUrl:true}); 
  }
  nutrientNav(id:number) {
    this.router.navigateByUrl('/nutrients/'+id, {replaceUrl:true})
  }

  

}
