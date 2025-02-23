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
  private user: any;
  private username: string = '';
  
  login(credentials: { username: string, password: string }): Observable<boolean> {
    console.log(credentials);
    return this.http.post('http://3.145.54.26:8080/login', credentials).pipe(
      map((response: any) => {
        // Handle successful response
        console.log('API Response:', response); 
        // Assuming your response has a success field (update this based on actual response)
        if (response) {
          this.isLoggedIn = true;
          this.username = credentials.username;
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => {
        // Handle error response
        console.error('API Error:', error);
        return of(false); // Return false if the login fails
      })
    );
  }

  createUser(credentials: { username: string, password: string }): Observable<boolean> {
    return this.http.post('http://3.145.54.26:8080/login/create', credentials).pipe(
      map((response: any) => {
        console.log('User Created:', response); // Handle success response
        console.log(response);
        if (response != null) {
          this.username = credentials.username;
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Create User Error:', error); // Handle error response
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

  getUsername(): string {
    return this.username;
  }

}
