import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { PositionComponent } from './position/position.component';
import { AddPositionComponent } from './position/add-position/add-position.component';
import { AuditPositionComponent } from './position/audit-position/audit-position.component';
import { LayoutComponent } from './layout/layout.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { PasswordComponent } from './password/password.component';
import { MasterdataComponent } from './masterdata/masterdata.component';
import { AddMasterdataComponent } from './masterdata/add-masterdata/add-masterdata.component';
import { AuthGuard } from './helpers/auth.guard';
import { EditPositionComponent } from './position/edit-position/edit-position.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PositionComponent,
    AddPositionComponent,
    AuditPositionComponent,
    LayoutComponent,
    UserComponent,
    AddUserComponent,
    PasswordComponent,
    MasterdataComponent,
    AddMasterdataComponent,
    EditPositionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
