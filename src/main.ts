import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { HomePageComponent } from './app/home-page/home-page.component';
import { CompanyPageComponent } from './app/company-page/company-page.component';
import { LeaveAReviewComponent } from './app/leave-areview/leave-areview.component';
import { LayoutComponent } from './app/layout/layout.component';
import { LoginpageComponent } from './app/loginpage/loginpage.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'login', component: LoginpageComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },  // Default route
      {
        path: '',
        component: LayoutComponent,
        children: [
           { path: 'home', component: HomePageComponent },
           { path: 'company/:name', component: CompanyPageComponent },
           { path: 'review', component: LeaveAReviewComponent },
        ]
      },
    ]),
    provideHttpClient()
  ]
}).catch((err) => console.error(err));
