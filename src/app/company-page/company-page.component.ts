import {Component, NgModule, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';  // Assuming you need to make an HTTP request
import { CommonModule } from '@angular/common';
import { DisplayReviewComponent } from "./display-review/display-review.component";
import { LeaveAReviewComponent } from '../leave-areview/leave-areview.component';
import {AuthService} from "../auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule],
})
export class AppModule {}

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.css'],
  imports: [HttpClientModule, DisplayReviewComponent, CommonModule, LeaveAReviewComponent, ReactiveFormsModule, FormsModule],
  standalone: true
})
export class CompanyPageComponent implements OnInit {
  companyData: any[] = [];
  companyReviews: any[] = [];
  companyInfo: any;
  filteredReviews : any[] = [];
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get the 'id' parameter from the route

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
      this.companyInfo = this.companyData[0];
      this.companyReviews = this.companyData[1];
      this.filteredReviews = this.companyReviews;
      console.log(this.companyReviews)
    });
  }


  // Filter reviews based on the search term
  filterReviews() {
    if (this.searchTerm.trim() === '') {
      // If the search term is empty, show all reviews
      this.filteredReviews = this.companyReviews;
    } else {
      // Filter reviews based on the role
      this.filteredReviews = this.companyReviews.filter(review =>
        review.role.toLowerCase().includes(this.searchTerm.toLowerCase()) // Case-insensitive search
      );
    }
  }

  // Watch for changes in searchTerm and filter reviews
  ngOnChanges() {
    this.filterReviews();
  }
}
