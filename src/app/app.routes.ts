import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // Admin
  {
    path: 'admin/events',
    loadComponent: () => import('./components/event/event.component').then(m => m.EventComponent),
    canActivate: [authGuard],
    data: { role: 'admin' }
  },
  {
    path: 'admin/categories',
    loadComponent: () => import('./components/category/category.component').then(m => m.CategoryComponent),
    canActivate: [authGuard],
    data: { role: 'admin' }
  },
  {
    path: 'admin/venues',
    loadComponent: () => import('./components/venue/venue.component').then(m => m.VenueComponent),
    canActivate: [authGuard],
    data: { role: 'admin' }
  },
  {
    path: 'admin/sponsors',
    loadComponent: () => import('./components/sponsor/sponsor.component').then(m => m.SponsorComponent),
    canActivate: [authGuard],
    data: { role: 'admin' }
  },

  // User
  {
    path: 'user/events',
    loadComponent: () => import('./user/user-dashboard.component').then(m => m.UserDashboardComponent),
    canActivate: [authGuard],
    data: { role: 'user' }
  },
  {
    path: 'user/feedback',
    loadComponent: () => import('./feedback/feedback.component').then(m => m.FeedbackComponent),
    canActivate: [authGuard],
    data: { role: 'user' }
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
