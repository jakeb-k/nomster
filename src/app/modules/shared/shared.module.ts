import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from 'src/app/comps/header/header.component';
import { UpdateGoalModalComponent } from 'src/app/comps/update-goal-modal/update-goal-modal.component';
import { StatusComponent } from 'src/app/comps/status/status.component';
import { LoaderComponent } from 'src/app/comps/loader/loader.component';
import { MealResultComponent } from 'src/app/comps/meal-result/meal-result.component';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent, 
    UpdateGoalModalComponent, 
    StatusComponent,
    LoaderComponent,
    MealResultComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports:[
    HeaderComponent, 
    UpdateGoalModalComponent, 
    StatusComponent,
    LoaderComponent,
    MealResultComponent
  ]
})
export class SharedModule { }
