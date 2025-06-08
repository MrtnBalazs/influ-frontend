import { Routes } from '@angular/router';
import { CampagneListComponent } from './campagne/campagne-list/campagne-list.component';
import { CreateCampagneComponent } from './campagne/create-campagne/create-campagne.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './signup/login/login.component';
import { AuthGuard } from './service/authentication/auth.guard';
import { MyCampagnesComponent } from './campagne/my-campagnes/my-campagnes.component';
import { AllCampagnesComponent } from './campagne/all-campagnes/all-campagnes.component';
import { SavedCampagnesComponent } from './campagne/saved-campagnes/saved-campagnes.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { MyPitchesComponent } from './pitch/my-pitches/my-pitches.component';
import { RegisterComponent } from './signup/register/register.component';

export const routes: Routes = [
    { path: 'homepage', component: HomepageComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'messages', component: HomepageComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent }, // TODO not logged in guard
    { path: 'register', component: RegisterComponent }, // TODO not logged in guard

    // Campagnes
    { path: 'campagnes', component: AllCampagnesComponent },
    { path: 'my-campagnes', component: MyCampagnesComponent, canActivate: [AuthGuard] },
    { path: 'saved-campagnes', component: SavedCampagnesComponent, canActivate: [AuthGuard],},
    { path: 'create-campagne', component: CreateCampagneComponent, canActivate: [AuthGuard] },
    {
        path: 'campagnes/:id',
        loadComponent: () => import('./campagne/campage/campage.component').then((m) => m.CampageComponent),
    },

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
    { path: 'my-pitches', component: MyPitchesComponent },
];
