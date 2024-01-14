import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroceryPageRoutingModule } from './grocery-routing.module';

import { GroceryPage } from './grocery.page';

import { SharedModule } from '../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroceryPageRoutingModule,
    SharedModule
  ],
  declarations: [GroceryPage]
})
export class GroceryPageModule {}
