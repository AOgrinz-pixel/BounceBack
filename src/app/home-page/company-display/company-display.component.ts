import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './company-display.component.html',
  styleUrls: ['./company-display.component.css']
})
export class CompanyComponent {
  @Input() company: any; // The company data will be passed to this component
}
