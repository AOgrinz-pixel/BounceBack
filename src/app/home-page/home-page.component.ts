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
      "I can't think of things to write!",
      "Is this your 5th rejection today???",
      "Come Here Often Huh?",
      "Rejection builds character. Soon, you'll have too much character.",
      "At this rate, you're gonna unlock a hidden rejection achievement.",
      "They said no? Time to apply again under a fake name.",
      "Your resume has been seen... and ignored.",
      "Congratulations! You have successfully been considered... and discarded.",
      "Rejection is just redirection... to more rejection!",
      "Fun Fact: If you print out all your rejection emails, you can build a fort.",
      "Maybe the real internship was the self-esteem we lost along the way.",
      "Don't worry! There are infinite jobs... and infinite rejections.",
      "Applying to jobs is just a dating app where nobody swipes right.",
      "At least this rejection wasn't hand-written in calligraphy.",
      "If rejection emails were a currency, you'd be rich!",
      "You’ve unlocked the ‘Most Persistent’ badge! (It does nothing.)",
      "You've been ghosted so much, even the spirits feel bad for you.",
      "Nothing personal, kid... just an automated response.",
      "Somewhere out there, an AI recruiter just rejected you in 0.002 seconds.",
      "You vs. ATS: 0 - 100",
      "Don't worry, rejection is like XP grinding. Just with more crying.",
      "One day, you'll be the one rejecting them!",
      "You either get the job or become the final boss of LinkedIn rejections.",
      "It’s not you, it’s them. No really, their hiring process is terrible.",
      "This rejection email was proudly crafted by ChatGPT!",
      "You miss 100% of the jobs you don’t apply for... and like 95% of the ones you do.",
      "Applying for jobs is just gambling but with worse odds.",
      "Every rejection brings you closer to... another rejection!",
      "Your resume wasn’t strong enough to defeat the ATS boss battle.",
      "Your rejection email has been delivered via carrier pigeon.",
      "Are you collecting these? Because you’re doing great.",
      "The good news: You’re gaining resilience. The bad news: You didn’t want it.",
      "Is it rejection if they never even read your application?",
      "Don't be sad. Recruiters get rejected by candidates too!",
      "Rejection speedrun: Any% WR: 13 seconds after submission.",
      "It's fine. One day, you'll be rich and ignore their emails instead.",
      "The real job was the rejections we survived along the way.",
      "Chin up! Even Batman got rejected by the Justice League once.",
      "If I had a nickel for every rejection, I’d have a lot of nickels. It's not a coincidence, I just suck."
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
    const url = `http://localhost:8080/reviews/total`;  // Adjust to the actual endpoint for total reviews
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
    this.http.get<any[]>('http://localhost:8080/home') // Ensure the API returns an array
      .subscribe((data) => {
        this.companies = data; // Assign the response to an array
        console.log(data)
        this.filteredCompanies = this.companies
      });
  }

}
