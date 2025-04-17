import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ ADD THIS
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    const { username, password } = this.loginForm.value;

    if (username === 'admin' && password === 'admin123') {
      sessionStorage.setItem('role', 'admin');
      this.router.navigate(['/admin/events']);
    } else if (username === 'user' && password === 'user1123') {
      sessionStorage.setItem('role', 'user');
      this.router.navigate(['/user/events']);
    } else {
      alert('Invalid credentials!');
    }
  }
}
