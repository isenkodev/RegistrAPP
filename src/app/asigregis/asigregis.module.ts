import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsigregisPageRoutingModule } from './asigregis-routing.module';

import { AsigregisPage } from './asigregis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsigregisPageRoutingModule
  ],
  declarations: [AsigregisPage]
})
export class AsigregisPageModule {}
