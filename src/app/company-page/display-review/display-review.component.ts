import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-review.component.html',
  styleUrl: './display-review.component.css'
})
export class DisplayReviewComponent {
  @Input() review: any; // The company data will be passed to this component


  getStars(type: any) {
    let stars = [];
    let fullStars = 0;
    let halfStars = 0;  
    let emptyStars = 0;
    if (type == 'quality') {
      fullStars = Math.floor(this.review.quality);
      halfStars = (this.review.quality % 1) >= 0.5 ? 1 : 0; 
      emptyStars = 5 - fullStars - halfStars; 
    } else if (type == 'conf') {
      fullStars = Math.floor(this.review.confidence);
      halfStars = (this.review.confidence % 1) >= 0.5 ? 1 : 0; 
      emptyStars = 5 - fullStars - halfStars; 
    } else if (type == 'compet') {
      fullStars = Math.floor(this.review.competitiveness);
      halfStars = (this.review.competitiveness % 1) >= 0.5 ? 1 : 0; 
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
      '/assets/images/backgroundtest2.jpg',
      '/assets/images/backgroundtest3.jpg',
      '/assets/images/backgroundtest4.jpg',
      '/assets/images/backgroundtest5.jpg',
    ];

    // Randomly pick an image from the array
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    this.randomImage = backgroundImages[randomIndex];
  }

}
