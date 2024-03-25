import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database/database.service';
import { Favourite } from '../interfaces/favourite';
import { Router } from '@angular/router';
import { Nutrient } from '../interfaces/nutrient';
import { WritableSignal } from '@angular/core';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.page.html',
  styleUrls: ['./favs.page.scss'],
})
export class FavsPage implements OnInit {
  //favs item, which is writable signal array, but may be single object
  favs!: WritableSignal<Favourite[]>; ;


  //interface that stores all the nutrients as array, as nutrients be in different orders
  nutrientsArr: Nutrient[] = []; 

  /**
   * Initializes the component with DatabaseService and Router.
   * @param database - Service for database operations.
   * @param router - Router for navigation.
   */
  constructor(private database: DatabaseService, private router: Router) { }


  /**
   * Loads favourite items from the database on initialization.
   * Catches and logs any errors during the loading process.
   */
  ngOnInit() {
    //sends request to database to return the favs as writable signal
    //will return error if there is a problem
    try {
      this.database.loadFavs(); 
      this.favs = this.database.getFavs(); 
    } catch (err) {
      console.log(err)
    }

  }

  /**
   * Deletes a favourite item from the database.
   * @param fav - The favourite item to be deleted.
   */
  deleteFav(fav: Favourite) {
    this.database.deleteFavById(fav.id.toString()); 
  }

  /**
   * Navigates to the recipe details page based on the recipe ID.
   * @param id - The unique identifier of the recipe.
   */
  recipeNav(id:Number){
    this.router.navigateByUrl('/recipe/'+id+'/favs', {replaceUrl:true}); 
  }
   /**
   * Navigates to the nutrient details page for a specific recipe.
   * @param id - The unique identifier of the recipe.
   */
  nutrientNav(id:number) {
    this.router.navigateByUrl('/nutrients/'+id+'/favs', {replaceUrl:true})
  }
  navHome() {
    this.router.navigateByUrl('/login'); 
  }

  

}
