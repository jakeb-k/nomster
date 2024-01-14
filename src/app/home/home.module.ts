import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { MealResultComponent } from '../comps/meal-result/meal-result.component';
import { HomePageRoutingModule } from './home-routing.module';

import { SharedModule } from '../modules/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [HomePage, MealResultComponent]
})
export class HomePageModule {}
