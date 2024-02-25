import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SearchPage } from './search.page';
import { SearchPageRoutingModule } from './search-routing.module';

import { SharedModule } from '../modules/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    SharedModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
