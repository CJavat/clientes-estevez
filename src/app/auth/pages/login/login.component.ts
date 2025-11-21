import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    const userLogin = this.loginForm.value;

    const loginSuccess: boolean = this.authService.login(userLogin);
    console.log({ loginSuccess });
    if (!loginSuccess) {
      Swal.fire(
        'Error',
        'Email o Contraseña incorrectos, intenta otra vez.',
        'error'
      );

      return;
    }

    this.router.navigate(['/']);

    return;
  }
}
