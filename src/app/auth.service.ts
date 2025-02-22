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
  private success: any;
  
  login(credentials: { username: string, password: string }): Observable<boolean> {
    console.log(credentials);
    this.http.post('http://localhost:8080/login', credentials).subscribe(
      (response) => {
        console.log('API Response:', response); // Handle success response
        this.success = response;
      },
      (error) => {
        console.error('API Error:', error); // Handle error response
      }
    );
    if (this.success == true) {
      return of(true)
    }
    return of(false);
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

}
