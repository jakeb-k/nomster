import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../modules/shared/shared.module';

import { ProfileInputPageRoutingModule } from './profile-input-routing.module';

import { ProfileInputPage } from './profile-input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileInputPageRoutingModule,
    SharedModule
  ],
  declarations: [ProfileInputPage]
})
export class ProfileInputPageModule {}
