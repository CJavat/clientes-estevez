import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';

import { HomeLayoutComponent } from './home/layouts/home-layout/home-layout.component';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { RegisterCustomerComponent } from './home/pages/register-customer/register-customer.component';
import { EditCustomerComponent } from './home/pages/edit-customer/edit-customer.component';

export const routes: Routes = [
  {
    // Rutas Autenticadas
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
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
  {
    // Rutas Púublicas
    path: '',
    canActivate: [isAuthenticatedGuard],
    component: HomeLayoutComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '', title: 'Inicio', component: HomePageComponent },
      {
        path: 'register-customer',
        title: 'Registrar Cliente',
        component: RegisterCustomerComponent,
      },
      {
        path: 'edit-customer/:id',
        title: 'Editar Cliente',
        component: EditCustomerComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
