import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RegisterUser } from '../../../auth/interfaces';
import { TitleCasePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [RouterModule, TitleCasePipe],
})
export class HomePageComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  customers = computed(() => this.authService.allUser());

  deleteCustomer(id: number, email: string) {
    const token = localStorage.getItem('token');
    if (email === token) {
      Swal.fire(
        'Error',
        'No te puedes eliminar a ti mismo, elige otro cliente / usuario.',
        'error'
      );

      return;
    }

    this.authService.removeUser(id);
  }
}
