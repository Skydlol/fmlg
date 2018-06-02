import { Routes, RouterModule } from '@angular/router';
import { AUTH_ROUTES } from './authentication/auth.routes';

import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CrmComponent } from './home/crm/crm.component';

import { AuthenticationGuardService as AuthGuard } from './authentication/authentication-guard.service';


const APP_ROUTES: Routes = [
    { path: '', canActivate: [AuthGuard], component: HomeComponent, children: [
        { path: 'crm', component: CrmComponent }
    ]},
    { path: 'authentication', component: AuthenticationComponent, children: AUTH_ROUTES },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
