import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Router} from '@angular/router';
import {AuthenticationService} from "../../auth/services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuard implements CanLoad {

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  canLoad(): boolean {
    const user = this.authService.getLoggedUser();

    if (user) {
      this.router.navigate(['main/jobs']);

      return false;
    }

    return true;
  }
}
