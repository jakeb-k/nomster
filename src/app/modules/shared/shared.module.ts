import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/comps/header/header.component';
import { UpdateGoalModalComponent } from 'src/app/comps/update-goal-modal/update-goal-modal.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [HeaderComponent, UpdateGoalModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports:[HeaderComponent, UpdateGoalModalComponent]
})
export class SharedModule { }
