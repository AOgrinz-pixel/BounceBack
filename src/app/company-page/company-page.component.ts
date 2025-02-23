import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';  // Assuming you need to make an HTTP request
import { CommonModule } from '@angular/common';
import { DisplayReviewComponent } from "./display-review/display-review.component";
import { LeaveAReviewComponent } from '../leave-areview/leave-areview.component';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.css'],
  imports: [HttpClientModule, DisplayReviewComponent, CommonModule, LeaveAReviewComponent],
  standalone: true
})
export class CompanyPageComponent implements OnInit {

  topPosition: string = '100vh';
    transformStyle: string = 'rotate(0deg)';  // Initial rotation


    topPosition2: string = '100vh';
    transformStyle2: string = 'rotate(180deg)';  // Initial rotation

    topPosition3: string = '100vh';
    topPosition4: string = '100vh';



    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
//       const scrollY = window.scrollY;
//
//       // Ensure the image moves up from the bottom, but doesn't go above the top of the viewport
//       this.topPosition = `calc(100vh - ${scrollY}px - 300px)`;  // Moves upward as you scroll
//       this.topPosition3 = `calc(100vh - ${scrollY}px - 450px)`;  // Moves upward as you scroll
//       this.topPosition4 = `calc(100vh + ${scrollY}px - 450px)`;  // Moves downward as you scroll
//
//
//
//       // Calculate rotation for a smooth back-and-forth movement
//       const rotation = (Math.sin(scrollY / 100) * 15).toFixed(2);  // Sinusoidal rotation
//       this.transformStyle = `rotate(${rotation}deg)`;
//
//       // Ensure the image moves up from the bottom, but doesn't go above the top of the viewport
//       this.topPosition2 = `calc(100vh + ${scrollY}px - 1000px)`;  // Moves upward as you scroll
//
//       // Calculate rotation for a smooth back-and-forth movement
//       const rotation2 = ((Math.sin(scrollY / 100) * 15) + 180).toFixed(2);  // Sinusoidal rotation
//       this.transformStyle2 = `rotate(${rotation2}deg)`;
      this.updatePosition();
    }

  private updatePosition() {
    const scrollY = window.scrollY;

    // Ensure the image moves up from the bottom, but doesn't go above the top of the viewport
    this.topPosition = `calc(100vh - ${scrollY}px - 300px)`;  // Moves upward as you scroll
    this.topPosition3 = `calc(100vh - ${scrollY}px - 450px)`;  // Moves upward as you scroll
    this.topPosition4 = `calc(100vh + ${scrollY}px - 450px)`;  // Moves downward as you scroll



    // Calculate rotation for a smooth back-and-forth movement
    const rotation = (Math.sin(scrollY / 100) * 15).toFixed(2);  // Sinusoidal rotation
    this.transformStyle = `rotate(${rotation}deg)`;

    // Ensure the image moves up from the bottom, but doesn't go above the top of the viewport
    this.topPosition2 = `calc(100vh + ${scrollY}px - 1000px)`;  // Moves upward as you scroll

    // Calculate rotation for a smooth back-and-forth movement
    const rotation2 = ((Math.sin(scrollY / 100) * 15) + 180).toFixed(2);  // Sinusoidal rotation
    this.transformStyle2 = `rotate(${rotation2}deg)`;
  }


  companyData: any;
  companyReviews: any;
  companyInfo: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get the 'id' parameter from the route
    this.updatePosition();
    this.route.paramMap.subscribe(params => {
      const companyName = params.get('name');
      this.fetchCompanyData(companyName);
      console.log(companyName);
    });
  }

  fetchCompanyData(name: any): void {
    // Replace with your actual API endpoint
    const url = `http://localhost:8080/company/${name}`;

    this.http.get<any[]>(url).subscribe(data => {
      this.companyData = data;
      this.companyInfo = this.companyData.company;
      this.companyReviews = this.companyData.reviews;
      console.log(this.companyReviews);
    });
  }

  showReviewSlide = false;

  toggleReviewSlide() {
    this.showReviewSlide = !this.showReviewSlide;
  }
}
