import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) {}
  private isLoggedIn = false;
  
  login(credentials: { username: string, password: string }): Observable<boolean> {
    return this.http.post('https://localhost:8080/login', credentials).pipe(
      map((response: any) => {
        console.log('API Response:', response); // Handle success response
        this.isLoggedIn = true;
        return true;
      }),
      catchError((error) => {
        console.error('API Error:', error); // Handle error response
        return of(false);
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

}
