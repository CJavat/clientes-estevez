import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [], //TODO: Agregar el GUARD.
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', title: 'Iniciar Sesión', component: LoginComponent },
      {
        path: 'register',
        title: 'Crear Usuario',
        component: RegisterComponent,
      },
    ],
  },
  // publicas
  // {
  //   path: '',
  //   children: [
  //     { path: '', title: 'Inicio', component: HomeComponent },
  //     {
  //       path: 'register-customer',
  //       title: 'Registrar Cliente',
  //       component: RegisterCustomerComponent,
  //     },
  //     {
  //       path: 'edit-customer',
  //       title: 'Editar Cliente',
  //       component: EditCustomerComponent,
  //     },
  //   ],
  // },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
