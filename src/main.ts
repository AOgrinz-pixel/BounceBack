import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { HomePageComponent } from './app/home-page/home-page.component';
import { CompanyPageComponent } from './app/company-page/company-page.component';
import { LeaveAReviewComponent } from './app/leave-areview/leave-areview.component';
// Configure the router
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'home', component: HomePageComponent },
      { path: 'company/:name', component: CompanyPageComponent },
      { path: 'review', component: LeaveAReviewComponent },
    ])
  ]
}).catch((err) => console.error(err));
