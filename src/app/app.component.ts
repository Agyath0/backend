// import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // role: string | null = null;
  role: string | null = sessionStorage.getItem('role');

  constructor(private router: Router) {
    this.role = sessionStorage.getItem('role');

    // ✅ Update role on every route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.role = sessionStorage.getItem('role');
      }
    });
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
