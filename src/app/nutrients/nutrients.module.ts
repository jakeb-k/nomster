import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NutrientsPageRoutingModule } from './nutrients-routing.module';

import { NutrientsPage } from './nutrients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NutrientsPageRoutingModule
  ],
  declarations: [NutrientsPage]
})
export class NutrientsPageModule {}
