import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClicLocationPageRoutingModule } from './clic-location-routing.module';

import { ClicLocationPage } from './clic-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClicLocationPageRoutingModule
  ],
  declarations: [ClicLocationPage]
})
export class ClicLocationPageModule {}
