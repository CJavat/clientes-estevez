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
  selector: 'register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
})
export class RegisterComponent {
  //TODO: TERMINAR
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  public loginForm: FormGroup = this.fb.group({
    fullName: [
      'daniel plascencia',
      [Validators.required, Validators.minLength(6)],
    ],
    email: ['root@test.com', [Validators.required, Validators.email]],
    phoneNumber: [
      '3312135312',
      [Validators.required, Validators.minLength(10)],
    ],
    password: ['password', [Validators.required, Validators.minLength(6)]],
  });
}
