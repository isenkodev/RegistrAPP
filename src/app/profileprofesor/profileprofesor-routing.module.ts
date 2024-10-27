import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileprofesorPage } from './profileprofesor.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileprofesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileprofesorPageRoutingModule {}
