import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';  // Assuming you need to make an HTTP request
import { CommonModule } from '@angular/common';
import { DisplayReviewComponent } from "./display-review/display-review.component";
@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.css'],
  imports: [HttpClientModule, DisplayReviewComponent, CommonModule], 
  standalone: true  
})
export class CompanyPageComponent implements OnInit {
  companyData: any[] = [];
  companyReviews: any[] = [];
  companyInfo: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Get the 'id' parameter from the route

    console.log("HEERRERERERERERERE");
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
      console.log(this.companyReviews)
    });
  }
}