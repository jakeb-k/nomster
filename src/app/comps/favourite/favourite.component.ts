import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Favourite } from 'src/app/interfaces/favourite';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent  implements OnInit {

  @Input() fav!: Favourite

  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {}

  async deleteFav(fav: Favourite) {
    this.database.deleteFavById(fav.id.toString()); 
  }
  recipeNav(id:Number){
    this.router.navigateByUrl('/recipe/'+id, {replaceUrl:true}); 
  }

}
