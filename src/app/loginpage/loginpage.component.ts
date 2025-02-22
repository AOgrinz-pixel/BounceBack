import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, @Inject(AuthService) private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    // Initialize any necessary data or state here
    this.authService.logout();
    console.log(this.authService.isAuthenticated());
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(success => {
        if (success) {
          this.router.navigate(['/home']);
        } else {
          alert('Login failed');
        }
      });
    }
  }

  skipLogin(): void {
    this.router.navigate(['/home']);
  }

  createUser(): void {
    this.router.navigate(['/createuser']);
  }

}

