import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Favourite } from '../interfaces/favourite';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.page.html',
  styleUrls: ['./favs.page.scss'],
})
export class FavsPage implements OnInit {

  favs: any;

  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.database.loadFavs(); 
    this.favs = this.database.getFavs(); 
  }
  async deleteFav(fav: Favourite) {
    this.database.deleteFavById(fav.id.toString()); 
  }

}
