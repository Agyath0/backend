import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const role = sessionStorage.getItem('role');
  const expectedRole = route.data['role'];

  if (role && role === expectedRole) {
    return true;
  }

  const router = inject(Router);
  router.navigate(['/login']);
  return false;
};
