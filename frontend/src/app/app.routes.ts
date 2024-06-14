import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { activateGuard } from './guards/activate.guard';

export const routes: Routes = [
  { path: 'home', title: 'Home', component: HomeComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  {
    path: 'jobs',
    title: 'Jobs',
    component: JobsComponent,
    canActivate: [activateGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', title: '404 Page not Found', component: PageNotFoundComponent },
];
