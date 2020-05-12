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
    path: 'clic-location',
    loadChildren: () => import('./clic-location/clic-location.module').then( m => m.ClicLocationPageModule)
  },
  {
    path: 'image',
    loadChildren: () => import('./image/image.module').then( m => m.ImagePageModule)
  },
  {
    path: 'resultat',
    loadChildren: () => import('./resultat/resultat.module').then( m => m.ResultatPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
