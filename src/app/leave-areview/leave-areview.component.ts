import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators, MinValidator } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leave-areview',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './leave-areview.component.html',
  styleUrl: './leave-areview.component.css'
})


export class LeaveAReviewComponent implements OnInit {
  // Variables to hold user input
  userForm: FormGroup;
  rejectOptions: string[] = ['Ghosted', 'Emailed', 'Phone Call', 'Other'];
  numOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  submitted = false;

  constructor(private fb:FormBuilder) {
    // Initialize the form controls inside the form group
    this.userForm = this.fb.group({
      companyName: new FormControl(''),  
      role: new FormControl(''), 
      confidence: new FormControl(null),
      compet: new FormControl(null),
      rejected: new FormControl(''),
      rounds: new FormControl(null, Validators.min(0)),
      other: new FormControl('')
    });
  }

  ngOnInit() {
    // You can add any logic you want to run on initialization here
  }

  // This function will save the user input when the form is submitted
  saveInput() {
    // You can now save the data, or send it to an API, etc.
    const formData = this.userForm.value
    console.log(this.userForm.value);
    this.submitted = true;
  }

  newInput() {
    this.submitted = false;
    this.userForm.reset();
  }
}
