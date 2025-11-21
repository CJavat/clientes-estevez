import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'register-customer',
  templateUrl: './register-customer.component.html',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
})
export class RegisterCustomerComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public registerCustomerForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  registerCustomer() {
    const userRegister = this.registerCustomerForm.value;

    const registerSuccess: boolean = this.authService.register(userRegister);
    if (!registerSuccess) {
      Swal.fire(
        'Error',
        'Ocurrió un error al registar el cliente, intenta otra vez.',
        'error'
      );

      return;
    }

    return this.router.navigateByUrl('/');
  }
}
