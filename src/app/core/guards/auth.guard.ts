import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Router} from '@angular/router';
import {AuthenticationService} from "../../auth/services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  canLoad(): boolean {
    const user = this.authService.getLoggedUser();

    if (!user) {
      this.router.navigate(['auth/login']);

      return false;
    }

    return true;
  }
}
