import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { DataFetcherComponent } from './app/data-fetcher/data-fetcher.component';
import { HomePageComponent } from './app/home-page/home-page.component';
import { CompanyPageComponent } from './app/company-page/company-page.component';
import { LeaveAReviewComponent } from './app/leave-areview/leave-areview.component';
import { LayoutComponent } from './app/layout/layout.component';

// Configure the router
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      {
        path: '',
        component: LayoutComponent,
        children: [
          { path: 'home', component: HomePageComponent },
          { path: 'test', component: DataFetcherComponent },
          { path: 'review', component: LeaveAReviewComponent },
          { path: 'company/:name', component: CompanyPageComponent },
        ]
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }  // Default route
    ])
  ]
}).catch((err) => console.error(err));