import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClicLocationPage } from './clic-location.page';

const routes: Routes = [
  {
    path: '',
    component: ClicLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClicLocationPageRoutingModule {}
