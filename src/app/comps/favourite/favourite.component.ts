import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Favourite } from 'src/app/interfaces/favourite';
import { DatabaseService } from 'src/app/services/database/database.service';


@Component({
  selector: 'favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent  implements OnInit {
   
  // Input property for a favourite item
   @Input() fav!: Favourite;
  
   /**
    * Initializes the component with DatabaseService and Router.
    * @param database - Service for database operations.
    * @param router - Router for navigation.
    */
  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {}

  /**
   * Deletes a favourite item from the database.
   * @param fav - The favourite item to be deleted.
   */
  async deleteFav(fav: Favourite) {
    this.database.deleteFavById(fav.id.toString()); 
  }

  /**
   * Navigates to the recipe details page based on the recipe ID.
   * @param id - The unique identifier of the recipe.
   */
  recipeNav(id:Number){
    this.router.navigateByUrl('/recipe/'+id+'/favs', {replaceUrl:true}); 
     
  }

}
