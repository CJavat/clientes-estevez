import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { AuthStatus, RegisterUser } from '../interfaces';
import { LoginInterface } from '../interfaces/login.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly adminEmail: string = environment.email;
  private readonly adminPassword: string = environment.password;
  private _authStatus = signal<AuthStatus>(AuthStatus.notAuthenticated);
  private _allUsers = signal<RegisterUser[]>([]);

  public authStatus = computed(() => this._authStatus());
  public allUser = computed(() => this._allUsers());

  constructor() {
    this.checkAuthStatus();
  }

  checkAuthStatus(): boolean {
    const token = localStorage.getItem('token');
    this._allUsers.set(JSON.parse(localStorage.getItem('users') ?? '[]'));

    if (!token) {
      this.logout();
      return false;
    }

    this.setAuthentication(token);

    return true;
  }

  login(login: LoginInterface): boolean {
    const users: RegisterUser[] = JSON.parse(
      localStorage.getItem('users') || '[]'
    );

    const found = users.some(
      (user) => user.email === login.email && user.password === login.password
    );

    if (found) {
      localStorage.setItem('token', login.email);
      this._authStatus.set(AuthStatus.authenticated);
      return true;
    }

    if (
      login.email === this.adminEmail &&
      login.password === this.adminPassword
    ) {
      localStorage.setItem('token', login.email);
      this._authStatus.set(AuthStatus.authenticated);
      return true;
    }

    this._authStatus.set(AuthStatus.notAuthenticated);
    return false;
  }

  register(registerUser: RegisterUser): boolean {
    const users: RegisterUser[] = JSON.parse(
      localStorage.getItem('users') || '[]'
    );

    const emailExists = users.some((user) => user.email === registerUser.email);
    if (emailExists) return false;

    let newUser: RegisterUser = {
      ...registerUser,
      id: users.length + 1,
    };

    const updatedUsers: RegisterUser[] = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    this._allUsers.set(updatedUsers);

    return true;
  }

  removeUser(id: number) {
    const updatedUsers = this._allUsers().filter((user) => user.id !== id);

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    this._allUsers.set(updatedUsers);
  }

  updateUser(updatedUser: RegisterUser): boolean {
    const users = this._allUsers();

    const newUsers = users.map((user) => {
      if (user.id === updatedUser.id) return updatedUser;

      return user;
    });

    localStorage.setItem('users', JSON.stringify(newUsers));

    this._allUsers.set(newUsers);

    return true;
  }

  logout() {
    this._authStatus.set(AuthStatus.notAuthenticated);
    localStorage.removeItem('token');
  }

  private setAuthentication(token: string): boolean {
    this._authStatus.set(AuthStatus.authenticated);

    localStorage.setItem('token', token);

    return true;
  }
}
