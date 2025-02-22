import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isLoggedIn = false;

  login(credentials: { username: string, password: string }): Observable<boolean> {
    if (credentials.username === 'test' && credentials.password === 'test') {
      this.isLoggedIn = true;
      return of(true);
    } 
    return of(false);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
  isAuthenticated(): boolean {
    console.log(this.isLoggedIn);
    return this.isLoggedIn; 
  }

}
