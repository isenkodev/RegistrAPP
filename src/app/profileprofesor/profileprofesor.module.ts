import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileprofesorPageRoutingModule } from './profileprofesor-routing.module';

import { ProfileprofesorPage } from './profileprofesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileprofesorPageRoutingModule
  ],
  declarations: [ProfileprofesorPage]
})
export class ProfileprofesorPageModule {}
