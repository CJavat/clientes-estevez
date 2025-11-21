import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  public loginForm: FormGroup = this.fb.group({
    email: ['root@test.com', [Validators.required, Validators.email]],
    password: ['password', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    const userLogin = this.loginForm.value;

    const loginSuccess: boolean = this.authService.login(userLogin);
    console.log({ loginSuccess });
    if (!loginSuccess) {
      //TODO: MENSAJE DE ERROR CON SweetAlert2
      return;
    }

    //TODO: Mensaje de Success con SweetAlert2 y redirigir a la pantalla del dashboard.
    return;
  }
}
