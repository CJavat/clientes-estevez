import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'home-layout',
  templateUrl: './home-layout.component.html',
  standalone: true,
  imports: [RouterModule],
})
export class HomeLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  mobileOpen = signal(false);

  toggleMobileMenu() {
    this.mobileOpen.update((v) => !v);
  }

  logout() {
    this.authService.logout();
    return this.router.navigate(['/auth']);
  }
}
