import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsigregisPage } from './asigregis.page';

const routes: Routes = [
  {
    path: '',
    component: AsigregisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsigregisPageRoutingModule {}
