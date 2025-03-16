import { Routes } from '@angular/router';
import { CampageComponent } from './campagne/campage/campage.component';
import { CampagneListComponent } from './campagne/campagne-list/campagne-list.component';
import { CreateCampagneComponent } from './campagne/create-campagne/create-campagne.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './signup/signup.component';
import { RegisterComponent } from './signup/register/register/register.component';
import { RegisterSuccessComponent } from './signup/register/register-success/register-success.component';
import { RegisterErrorComponent } from './signup/register/register-error/register-error.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './signup/login/login.component';

export const routes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'homepage', component: HomepageComponent },
    { path: 'profile', component: HomepageComponent },
    //{ path: 'campagnes/1', component: CampageComponent },
    { path: 'campagnes', component: CampagneListComponent },
    { path: 'create-campagne', component: CreateCampagneComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registration/success', component: RegisterSuccessComponent },
    { path: 'registration/error', component: RegisterErrorComponent },
    { path: 'error/:errorMessage', component: ErrorComponent },
    {
        path: 'campagnes/:id',
        loadComponent: () => import('./campagne/campage/campage.component').then((m) => m.CampageComponent),
    },
];
