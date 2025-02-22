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
}
