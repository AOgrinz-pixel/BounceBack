import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';  // Assuming you need to make an HTTP request
import { CommonModule } from '@angular/common';
import {AuthService} from "../auth.service";
import { DisplayReviewComponent } from '../company-page/display-review/display-review.component';

@Component({
  selector: 'app-company-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  imports: [HttpClientModule, CommonModule, DisplayReviewComponent],
  standalone: true
})
export class UserPageComponent implements OnInit {
  username: any;
  reviews: any;
  userData: any;
  userReviews: any;
  userStats: any;
  selectedReview: any = null;
  showReviews = false;
  randomImage: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public authService: AuthService
  ) {}

  ngOnInit(): void {

      this.route.paramMap.subscribe(params => {
        const userName = params.get('name');
        this.username = userName;
        this.fetchUserData(userName);
        
      });

      const backgroundImages = [
        '/assets/images/backgroundtest6.png',
      ];
  
      // Randomly pick an image from the array
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      this.randomImage = backgroundImages[randomIndex];

    }
  
  fetchUserData(name: any): void {
    // Replace with your actual API endpoint
    const url = `http://3.145.54.26:8080/user/reviews/${name}`;

    this.http.get<any[]>(url).subscribe(data => {
      this.userData = data;
      this.userReviews = this.userData.reviews;
      console.log(this.userData)
    });
  }

  getStars(type: any) {
    let stars = [];
    let fullStars = 0;
    let halfStars = 0;  
    let emptyStars = 0;
    if (type == 'compet') {
      fullStars = Math.floor(this.userData.competitveness);
      halfStars = (this.userData.competitveness % 1) >= 0.5 ? 1 : 0; 
      emptyStars = 5 - fullStars - halfStars; 
    } else {
      fullStars = Math.floor(this.userData.confidence);
      halfStars = (this.userData.confidence % 1) >= 0.5 ? 1 : 0; 
      emptyStars = 5 - fullStars - halfStars; 
    } 

    // Push the appropriate number of stars into the array
    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }
    for (let i = 0; i < halfStars; i++) {
      stars.push('half');
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push('empty');
    }

    return stars;
  }


  toggleReviewVisibility() {
    this.showReviews = !this.showReviews;
  }

}
