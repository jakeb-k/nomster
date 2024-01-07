import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroceryPageRoutingModule } from './grocery-routing.module';

import { GroceryPage } from './grocery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroceryPageRoutingModule
  ],
  declarations: [GroceryPage]
})
export class GroceryPageModule {}
