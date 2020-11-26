import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from "../authentication.service";

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  canActivate(): boolean {
    const user = this.authService.getLoggedUser();

    if (user) {
      this.router.navigate(['jobs']);

      return false;
    }

    return true;
  }
}
