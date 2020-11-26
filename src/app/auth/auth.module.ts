import {NgModule} from "@angular/core";
import {LoginComponent} from "./components/login/login.component";
import {UserRegistrationComponent} from "./components/user-registration/user-registration.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AuthComponent } from './components/auth/auth.component';
import {AuthRoutingModule} from "./auth-routing.module";
import { OrganizationRegistrationComponent } from './components/organization-registration/organization-registration.component';
import { RegisterOptionsComponent } from './components/register-options/register-options.component';

@NgModule({
  declarations: [
    LoginComponent,
    UserRegistrationComponent,
    AuthComponent,
    OrganizationRegistrationComponent,
    RegisterOptionsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule
  ]
})
export class AuthModule{
}
