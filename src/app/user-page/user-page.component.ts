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
    }
  
  fetchUserData(name: any): void {
    // Replace with your actual API endpoint
    const url = `http://localhost:8080/user/reviews/${name}`;

    this.http.get<any[]>(url).subscribe(data => {
      this.userData = data;
      this.userReviews = this.userData.reviews;
      console.log(this.userData)
    });
  }

  toggleReviewVisibility() {
    this.showReviews = !this.showReviews;
  }

}
