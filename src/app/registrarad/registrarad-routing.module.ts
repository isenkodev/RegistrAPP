import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistraradPage } from './registrarad.page';

const routes: Routes = [
  {
    path: '',
    component: RegistraradPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistraradPageRoutingModule {}
