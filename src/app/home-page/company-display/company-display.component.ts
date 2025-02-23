import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './company-display.component.html',
  styleUrls: ['./company-display.component.css']
})

export class CompanyComponent {
  constructor(private router: Router) {}
  @Input() company: any; // The company data will be passed to this component


  getStars(type: any) {
    let stars = [];
    let fullStars = 0;
    let halfStars = 0;  
    let emptyStars = 0;
    if (type == 'rating') {
      fullStars = Math.floor(this.company.rating);
      halfStars = (this.company.rating % 1) >= 0.5 ? 1 : 0; 
      emptyStars = 5 - fullStars - halfStars; 
    } else {
      fullStars = Math.floor(this.company.competitiveness);
      halfStars = (this.company.competitiveness % 1) >= 0.5 ? 1 : 0; 
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

  randomImage: string = '';

  ngOnInit() {
    const backgroundImages = [
      '/assets/images/backgroundtest.jpg',
      '/assets/images/backgroundtest2.jpg',
      '/assets/images/backgroundtest3.jpg',
      '/assets/images/backgroundtest4.jpg',
      '/assets/images/backgroundtest5.jpg',
    ];

    // Randomly pick an image from the array
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    this.randomImage = backgroundImages[randomIndex];
  }

  goCompany() {
    this.router.navigate(['/company', this.company.name]);
  }

}
