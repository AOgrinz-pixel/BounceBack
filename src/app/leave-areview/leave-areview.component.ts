import { Component, OnInit, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators, MinValidator } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-leave-areview',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './leave-areview.component.html',
  styleUrl: './leave-areview.component.css'
})


export class LeaveAReviewComponent implements OnInit {
  // Variables to hold user input
  @Input() companyName: string = ''; // Accept company name as an input

  userForm: FormGroup;
  rejectOptions: string[] = ['Ghosted', 'Emailed', 'Phone Call', 'Other'];
  applyAgainOpts: string[] = ['Yes', 'No'];
  submitted = false;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, public authService: AuthService) {
    // Initialize the form controls inside the form group
    this.userForm = this.fb.group({
      username: new FormControl(authService.getUsername()),
      companyName: new FormControl(''),
      role: new FormControl(''),
      quality: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(5)]),
      confidence: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(5)]),
      compet: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(5)]),
      rejected: new FormControl('', [Validators.required, Validators.required]),
      rounds: new FormControl(null, [Validators.required, Validators.min(0)]),
      other: new FormControl(''),
      applyAgain: new FormControl(''),
    });
  }

  ngOnInit() {
    // You can add any logic you want to run on initialization here
    if (this.companyName) {
      this.userForm.get('companyName')?.setValue(this.companyName); // Auto-populate companyName field
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  // This function will save the user input when the form is submitted
  saveInput() {
    // You can now save the data, or send it to an API, etc.
    const formData = this.userForm.value

    // Convert the applyAgain value to 'TRUE' or 'FALSE' before sending
    formData.applyAgain = !!this.userForm.value.applyAgain;

    this.http.post('http://localhost:8080/company/review', formData).subscribe(
      (response) => {
        console.log('API Response:', response); // Handle success response
      },
      (error) => {
        console.error('API Error:', error); // Handle error response
      }
    );
    this.submitted = true;
  }

  newInput() {
    this.submitted = false;
    this.userForm.reset();
  }
}
