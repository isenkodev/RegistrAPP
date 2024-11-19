import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { noAutenticadoGuard } from './guard/no-autenticado.guard';
import { autenticadoGuard } from './guard/autenticado.guard';

const routes: Routes = [
  {
    path: 'home',
    //canActivate: [autenticadoGuard], 
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [noAutenticadoGuard], 
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'recuperar',
    canActivate: [noAutenticadoGuard],
    loadChildren: () => import('./recuperar/recuperar.module').then(m => m.RecuperarPageModule)
  },
  {
    path: 'listaprofesores',
    canActivate: [autenticadoGuard],
    loadChildren: () => import('./listaprofesores/listaprofesores.module').then(m => m.ListaprofesoresPageModule)
  },
  {
    path: 'registrarad',
    canActivate: [autenticadoGuard],
    loadChildren: () => import('./registrarad/registrarad.module').then(m => m.RegistraradPageModule)
  },
  {
    path: 'error404',
    canActivate: [noAutenticadoGuard],
    loadChildren: () => import('./error404/error404.module').then(m => m.Error404PageModule)
  },
  {
    path: 'asigregis',
    loadChildren: () => import('./asigregis/asigregis.module').then( m => m.AsigregisPageModule)
  },

  {
    path: '**',
    redirectTo: 'error404'
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
