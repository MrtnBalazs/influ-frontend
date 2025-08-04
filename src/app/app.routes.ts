import { Routes } from '@angular/router';
import { CreateCampagneComponent } from './campagne/create-campagne/create-campagne.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './signup/login/login.component';
import { AuthGuard } from './service/authentication/auth.guard';
import { MyCampagnesComponent } from './campagne/my-campagnes/my-campagnes.component';
import { AllCampagnesComponent } from './campagne/all-campagnes/all-campagnes.component';
import { ProfileComponent } from './profile/profile.component';
import { MyPitchesComponent } from './pitch/my-pitches/my-pitches.component';
import { RegisterComponent } from './signup/register/register.component';

export const routes: Routes = [
    { path: 'homepage', component: HomepageComponent },
    { path: 'campagnes', component: AllCampagnesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'my-campagnes', component: MyCampagnesComponent, canActivate: [AuthGuard] },
    { path: 'create-campagne', component: CreateCampagneComponent, canActivate: [AuthGuard] },
    { path: 'my-pitches', component: MyPitchesComponent, canActivate: [AuthGuard] },

];
