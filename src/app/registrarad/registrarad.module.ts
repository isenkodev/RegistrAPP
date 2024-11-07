import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistraradPageRoutingModule } from './registrarad-routing.module';

import { RegistraradPage } from './registrarad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistraradPageRoutingModule
  ],
  declarations: [RegistraradPage]
})
export class RegistraradPageModule {}
