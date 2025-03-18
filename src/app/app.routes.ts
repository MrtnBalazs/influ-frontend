import { Routes } from '@angular/router';
import { CampagneListComponent } from './campagne/campagne-list/campagne-list.component';
import { CreateCampagneComponent } from './campagne/create-campagne/create-campagne.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './signup/register/register/register.component';
import { RegisterSuccessComponent } from './signup/register/register-success/register-success.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './signup/login/login.component';

export const routes: Routes = [
    { path: 'homepage', component: HomepageComponent },
    { path: 'profile', component: HomepageComponent },
    { path: 'messages', component: HomepageComponent },
    { path: 'settings', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'registration/success', component: RegisterSuccessComponent },
    { path: 'error/:errorMessage', component: ErrorComponent },

    // Campagnes
    { path: 'campagnes', component: CampagneListComponent },
    {
        path: 'campagne/:id',
        loadComponent: () => import('./campagne/campage/campage.component').then((m) => m.CampageComponent),
    },
    { path: 'my-campagnes', component: CampagneListComponent },
    { path: 'saved-campagnes', component: HomepageComponent },
    { path: 'create-campagne', component: CreateCampagneComponent },

    // Brands
    { path: 'brands', component: HomepageComponent },
    {
        path: 'brand/:id',
        loadComponent: () => import('./campagne/campage/campage.component').then((m) => m.CampageComponent),
    },
    { path: 'saved-brands', component: HomepageComponent },

    // Influencers
    { path: 'influencers', component: HomepageComponent },
    {
        path: 'influencer/:id',
        loadComponent: () => import('./homepage/homepage.component').then((m) => m.HomepageComponent),
    },
    { path: 'saved-influencers', component: HomepageComponent },

    // Pitches /my-pitches
    { path: 'my-pitches', component: HomepageComponent },
];
