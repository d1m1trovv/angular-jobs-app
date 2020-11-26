import {Route, RouterModule} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {UserRegistrationComponent} from "./components/user-registration/user-registration.component";
import {NgModule} from "@angular/core";
import {AuthComponent} from "./components/auth/auth.component";
import {RegisterOptionsComponent} from "./components/register-options/register-options.component";

const routes: Route[] = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'sign-up/user',
        component: UserRegistrationComponent
      },
      {
        path: 'sign-up/organization',
        component: UserRegistrationComponent
      },
      {
        path: 'sign-up',
        component: RegisterOptionsComponent
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule{
}
