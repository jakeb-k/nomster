import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavsPageRoutingModule } from './favs-routing.module';

import { FavsPage } from './favs.page';
import { FavouriteComponent } from '../comps/favourite/favourite.component';
import { SharedModule } from '../modules/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavsPageRoutingModule,
    SharedModule
  ],
  declarations: [FavsPage, FavouriteComponent],
})
export class FavsPageModule {}
