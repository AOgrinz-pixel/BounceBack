import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CompanyPageComponent } from './company-page/company-page.component';
import { LeaveAReviewComponent } from './leave-areview/leave-areview.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { CreateUserComponent } from './create-user/create-user.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginpageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'company/:name', component: CompanyPageComponent },
  { path: 'review', component: LeaveAReviewComponent },
  { path: 'createuser', component: CreateUserComponent },
  {path: '', redirectTo: 'login', pathMatch: 'full'}
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
