export interface LoginRequest {
    username: string;
    password: string;
  }
  
  export interface LoginResponse {
    role: 'admin' | 'user';
    token?: string; // if you decide to add token handling later
  }
  