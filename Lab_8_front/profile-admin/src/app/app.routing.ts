import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ProfilesComponent} from "./profiles/profiles.component";


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profiles', component: ProfilesComponent },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
