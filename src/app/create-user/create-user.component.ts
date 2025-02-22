import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  loginForm: FormGroup;
  user: any;

  constructor(private fb: FormBuilder, @Inject(AuthService) private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    {
      if (this.loginForm.valid) {
        this.authService.createUser(this.loginForm.value).subscribe(success => {
          if (success) {
            this.authService.login(this.loginForm.value).subscribe(loginSuccess => {
              if (loginSuccess) {
                this.router.navigate(['/home']);
              } else {
                alert('Login failed');
              }
            });
          } else {
            alert('Create user failed');
          }
        });
      }
    }
  }
}
