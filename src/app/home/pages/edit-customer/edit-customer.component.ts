import { Component, computed, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { RegisterUser } from '../../../auth/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'edit-customer',
  templateUrl: './edit-customer.component.html',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
})
export class EditCustomerComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  public editCustomerForm!: FormGroup;
  public customerId!: string;
  public customer: RegisterUser | null = null;

  customers = computed(() => this.authService.allUser());

  constructor() {}

  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.customer =
      this.customers().find((c) => c.id === Number(this.customerId)) ?? null;

    if (!this.customer) {
      this.router.navigateByUrl('/');
      return;
    }

    this.editCustomerForm = this.fb.group({
      fullName: [
        this.customer?.fullName,
        [Validators.required, Validators.minLength(6)],
      ],
      email: [this.customer?.email, [Validators.required, Validators.email]],
      phoneNumber: [this.customer?.phoneNumber, [Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  editCustomer() {
    const updatedSuccess: boolean = this.authService.updateUser({
      id: Number(this.customerId),
      ...this.editCustomerForm.value,
    });
    if (!updatedSuccess) {
      Swal.fire(
        'Error',
        'Ocurrió un error al acutalizar el cliente, intenta otra vez.',
        'error'
      );

      return;
    }

    Swal.fire('Éxito', 'El cliente se actualizó exitosamente.', 'success').then(
      () => {
        this.router.navigateByUrl('/');
      }
    );
  }
}
