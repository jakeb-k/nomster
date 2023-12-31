import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Favourite } from '../interfaces/favourite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.page.html',
  styleUrls: ['./favs.page.scss'],
})
export class FavsPage implements OnInit {

  favs: any;

  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.database.loadFavs(); 
    this.favs = this.database.getFavs(); 
  }
  async deleteFav(fav: Favourite) {
    this.database.deleteFavById(fav.id.toString()); 
  }
  nav(id:Number){
    this.router.navigateByUrl('/recipe/'+id, {replaceUrl:true}); 
  }

}
