import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { DataFetcherComponent } from './app/data-fetcher/data-fetcher.component';
import { HomePageComponent } from './app/home-page/home-page.component';
import { CompanyComponent } from './app/home-page/company-display/company-display.component';

// Configure the router
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'home', component: HomePageComponent },
      { path: 'company/:id', component: CompanyComponent },
      { path: 'test', component: DataFetcherComponent },
    ])
  ]
}).catch((err) => console.error(err));