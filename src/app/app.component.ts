import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CompanyPageComponent } from './company-page/company-page.component';
import { LeaveAReviewComponent } from './leave-areview/leave-areview.component';

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'company/:name', component: CompanyPageComponent },
  { path: 'review', component: LeaveAReviewComponent },
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'RateMyRejection';
}
