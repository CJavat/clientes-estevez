import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { RegisterUser } from '../interfaces';
import { LoginInterface } from '../interfaces/login.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly adminEmail: string = environment.email;
  private readonly adminPassword: string = environment.password;

  //TODO: Ver si agrego JWT en localStorage o no.

  login(login: LoginInterface): boolean {
    const users: RegisterUser[] = JSON.parse(
      localStorage.getItem('users') || '[]'
    );

    const found = users.some(
      (user) => user.email === login.email && user.password === login.password
    );

    if (found) return true;

    if (
      login.email === this.adminEmail &&
      login.password === this.adminPassword
    ) {
      return true;
    }

    return false;
  }

  register(registerUser: RegisterUser): boolean {
    const users: RegisterUser[] = JSON.parse(
      localStorage.getItem('users') || '[]'
    );

    let newUser: RegisterUser = {
      ...registerUser,
      id: users.length + 1,
    };

    const updatedUsers: RegisterUser[] = [...users, newUser];

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    return true;
  }

  logout() {
    //TODO: TERMINAR
  }
}
