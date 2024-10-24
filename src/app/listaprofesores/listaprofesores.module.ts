import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaprofesoresPageRoutingModule } from './listaprofesores-routing.module';

import { ListaprofesoresPage } from './listaprofesores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaprofesoresPageRoutingModule
  ],
  declarations: [ListaprofesoresPage]
})
export class ListaprofesoresPageModule {}
