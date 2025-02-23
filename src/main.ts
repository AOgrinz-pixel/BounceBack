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
import { CreateUserComponent } from './app/create-user/create-user.component';
import { UserPageComponent } from './app/user-page/user-page.component';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },  // Default route
      {
        path: '',
        component: LayoutComponent,
        children: [
           { path: 'home', component: HomePageComponent },
           { path: 'company/:name', component: CompanyPageComponent },
           { path: 'review', component: LeaveAReviewComponent },
           { path: 'login', component: LoginpageComponent },
           { path: 'user/:name', component: UserPageComponent },
           { path: 'createuser', component: CreateUserComponent },
        ]
      },
      { path: 'login', component: LoginpageComponent },
    ]),
    provideHttpClient()
  ]
}).catch((err) => console.error(err));
