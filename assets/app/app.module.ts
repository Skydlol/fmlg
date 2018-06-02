import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CrmComponent } from './home/crm/crm.component';

import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuardService } from './authentication/authentication-guard.service';
import { CookieService } from 'ngx-cookie-service';
import { DemasyRequestService } from './shared/demasy-request.service';
import { HeaderComponent } from './home/header/header.component';
import { ContainerComponent } from './home/container/container.component';
import { SidebarComponent } from './home/container/sidebar/sidebar.component';
import { ContentComponent } from './home/container/content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    NotFoundComponent,
    CrmComponent,
    HeaderComponent,
    ContainerComponent,
    SidebarComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    routing
  ],
  providers: [ AuthenticationService, AuthenticationGuardService, CookieService, DemasyRequestService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
