import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';  // Import HttpClient

@Component({
  selector: 'app-data-fetcher',
  templateUrl: 'data-fetcher.component.html',
  standalone: true,
  imports: [HttpClientModule, CommonModule],  // Import HttpClient here to allow HTTP requests
})
export class DataFetcherComponent {
  data: any;

  constructor(private http: HttpClient) {}

  fetchData() {
    const apiUrl = 'https://catfact.ninja/fact'; // Replace with your API URL
    
    // Make HTTP GET request
    this.http.get(apiUrl).subscribe(
      (response) => {
        this.data = response;
        console.log('Data fetched:', this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}