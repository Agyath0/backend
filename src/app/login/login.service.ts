import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from './login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router) {}

  loginUser(credentials: LoginRequest): boolean {
    const { username, password } = credentials;

    if (username === 'admin' && password === 'admin123') {
      sessionStorage.setItem('role', 'admin');
      sessionStorage.setItem('username', username);
      this.router.navigate(['/admin/events']);
      return true;
    } else if (username === 'user' && password === 'user1123') {
      sessionStorage.setItem('role', 'user');
      sessionStorage.setItem('username', username);
      this.router.navigate(['/users']);
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('role');
  }
}
