import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CompanyComponent } from "./company-display/company-display.component";
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CompanyComponent, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  companies: any[] = []; // Array to hold the list of companies
  searchTerm: string = '';
  filteredCompanies : any[] = [];
  totalReviewsCount: number = 0; // To hold the total number of reviews

  // Array of random messages
  //This COULD be an API call, but it's not lol
  randomMessages: string[] = [
    "You Suck! ...But so does everyone else!",
    "Lizards are at least 2x more likely to get rejected from an internship",
    "Lizards struggle 50% more with making resumes",
    "Cover Letters are a scam created by the shadow government!",
    "I cant think of things to write!",
    "Is this your 5th rejection today???",
    "Come Here Often Huh?",
  ];

  // Variable to hold the selected message
  selectedMessage: string = '';

  


  constructor(private route: ActivatedRoute, private http: HttpClient) {}



  ngOnInit() {
    this.getCompanies();

    this.selectedMessage = this.getRandomMessage();

    this.getTotalReviews();
  }


  // Fetch total reviews from the backend
  getTotalReviews(): void {
    const url = `http://3.145.54.26:8080/reviews/total`;  // Adjust to the actual endpoint for total reviews
    this.http.get<number>(url).subscribe(
      (response) => {
        this.totalReviewsCount = response; // Store the total reviews count
        console.log('Total reviews:', this.totalReviewsCount);
      },
      (error) => {
        console.error('Error fetching total reviews:', error);
      }
    );
  }

  getRandomMessage(): string {
    const randomIndex = Math.floor(Math.random() * this.randomMessages.length);
    return this.randomMessages[randomIndex];
  }


  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredCompanies = this.companies; // Show all companies if search term is empty
    } else {
      this.filteredCompanies = this.companies.filter(company =>
        company.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  getCompanies() {
    this.http.get<any[]>('http://3.145.54.26:8080/home') // Ensure the API returns an array
      .subscribe((data) => {
        this.companies = data; // Assign the response to an array
        console.log(data)
        this.filteredCompanies = this.companies
      });
  }

}
