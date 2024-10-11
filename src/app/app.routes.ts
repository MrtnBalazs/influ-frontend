import { Routes } from '@angular/router';
import { CampageComponent } from './campagne/campage/campage.component';
import { CampagneListComponent } from './campagne/campagne-list/campagne-list.component';
import { CreateCampagneComponent } from './campagne/create-campagne/create-campagne.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'homepage', component: HomepageComponent },
    //{ path: 'campagnes/1', component: CampageComponent },
    { path: 'campagnes', component: CampagneListComponent },
    { path: 'create-campagne', component: CreateCampagneComponent },
    {
        path: 'campagnes/:id',
        loadComponent: () => import('./campagne/campage/campage.component').then((m) => m.CampageComponent),
    },
];
