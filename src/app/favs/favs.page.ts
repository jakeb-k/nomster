import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Favourite } from '../interfaces/favourite';
import { Router } from '@angular/router';
import { Nutrient } from '../interfaces/nutrient';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.page.html',
  styleUrls: ['./favs.page.scss'],
})
export class FavsPage implements OnInit {
  //favs item, which is writable signal array, but may be single object
  //so its good to keep flexible, cus it may be an error as well
  favs: any;


  //interface that stores all the nutrients as array, as nutrients be in different orders
  nutrientsArr: Nutrient[] = []; 

  constructor(private database: DatabaseService, private router: Router) { }

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
  deleteFav(fav: Favourite) {
    this.database.deleteFavById(fav.id.toString()); //Delete function takes in fav and sends the id to db service

  }
  recipeNav(id:Number){
    this.router.navigateByUrl('/recipe/'+id, {replaceUrl:true}); //nav based off number

  }
  
  nutrientNav(id:number) {
    //uses the stored recipe id to open related nutrient table
   //replaceUrl ensure previous data is removed
    this.router.navigateByUrl('/nutrients/'+id, {replaceUrl:true})
  }

  

}
