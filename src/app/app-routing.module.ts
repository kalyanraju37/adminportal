import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PositionComponent } from './position/position.component';
import { AddPositionComponent } from './position/add-position/add-position.component';
import { AuditPositionComponent } from './position/audit-position/audit-position.component';
import { Layouts } from './app.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { PasswordComponent } from './password/password.component';
import { AddMasterdataComponent } from './masterdata/add-masterdata/add-masterdata.component';
import { MasterdataComponent } from './masterdata/masterdata.component';
import { EditPositionComponent } from './position/edit-position/edit-position.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: { layout: Layouts.Login } },
  { path: 'dashboard', component: DashboardComponent, data: { layout: Layouts.MainLayout } },
  { path: 'position', component: PositionComponent, data: { layout: Layouts.MainLayout } },
  { path: 'add-position', component: AddPositionComponent, data: { layout: Layouts.MainLayout } },
  { path: 'edit-position/:positionid', component: EditPositionComponent, data: { layout: Layouts.MainLayout } },
  { path: 'audit-position', component: AuditPositionComponent , data: { layout: Layouts.MainLayout }},
  { path: 'audit-position/:position', component: AuditPositionComponent , data: { layout: Layouts.MainLayout }},
  { path: 'user', component: UserComponent , data: { layout: Layouts.MainLayout }},
  { path: 'add-user', component: AddUserComponent , data: { layout: Layouts.MainLayout }},
  { path: 'password', component: PasswordComponent , data: { layout: Layouts.MainLayout }},
  { path: 'app-add-masterdata/:type', component: AddMasterdataComponent , data: { layout: Layouts.MainLayout }},
  { path: 'app-add-masterdata/:type/:action/:id', component: AddMasterdataComponent , data: { layout: Layouts.MainLayout }},
  { path: 'app-masterdata', component: MasterdataComponent , data: { layout: Layouts.MainLayout }},
  { path: 'app-user', component: UserComponent , data: { layout: Layouts.MainLayout }},
  { path: '', redirectTo: '/login' ,pathMatch: 'full', data: { layout: Layouts.Login }}
  //{ path: '**', redirectTo: 'dashboard' , data: { layout: Layouts.MainLayout }}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }