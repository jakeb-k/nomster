import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NutrientsPage } from './nutrients.page';

const routes: Routes = [
  {
    path: '',
    component: NutrientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NutrientsPageRoutingModule {}
