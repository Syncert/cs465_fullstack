// src/app/services/authentication.service.ts
import { Injectable, Inject } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripData } from '../services/trip-data';

@Injectable({ providedIn: 'root' })
export class Authentication {
  // Variable to handle Authentication Responses
  private authResp: AuthResponse | null = null;

  // Setup our storage and service access
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripData: TripData // <-- name matches usage below
  ) {}

  // Get our token from Storage
  // key: 'travlr-token'
  public getToken(): string {
    return this.storage.getItem('travlr-token') ?? '';
  }

  // Save token
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Logout
  public logout(): void {
    this.storage.removeItem('travlr-token');
    this.authResp = null;
  }

  // Is the user logged in (and token still valid)?
  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  // Get current user from token (call only after isLoggedIn())
  public getCurrentUser(): User {
    const token = this.getToken();
    try {
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    } catch {
      return { email: '', name: '' } as User;
    }
  }

  // Login via TripData service
  public login(user: User, passwd: string): void {
    this.tripData.login(user, passwd).subscribe({
      next: (value: AuthResponse) => {
        if (value?.token) {
          this.authResp = value;
          this.saveToken(value.token);
          // console.log(value);
        }
      },
      error: (err) => console.log('Error:', err)
    });
  }

  // Register via TripData service (API logs user in on success)
  public register(user: User, passwd: string): void {
    this.tripData.register(user, passwd).subscribe({
      next: (value: AuthResponse) => {
        if (value?.token) {
          this.authResp = value;
          this.saveToken(value.token);
          // console.log(value);
        }
      },
      error: (err) => console.log('Error:', err)
    });
  }
}