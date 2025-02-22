import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CompanyComponent } from "./company-display/company-display.component";
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

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

  constructor(private http: HttpClient) {}


  ngOnInit() {
    this.getCompanies();
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
        this.filteredCompanies = this.companies
      });
  }

}
