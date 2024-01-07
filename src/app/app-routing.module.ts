import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'recipe/:id',
    loadChildren: () => import('./recipe/recipe.module').then( m => m.RecipePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },  {
    path: 'favs',
    loadChildren: () => import('./favs/favs.module').then( m => m.FavsPageModule)
  },
  {
    path: 'profile-input',
    loadChildren: () => import('./profile-input/profile-input.module').then( m => m.ProfileInputPageModule)
  },
  {
    path: 'grocery',
    loadChildren: () => import('./grocery/grocery.module').then( m => m.GroceryPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
