import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../auth/services/authentication.service";
import {BehaviorSubject, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import has = Reflect.has;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isUserLoggedIn: boolean = false;

  destroy$ = new Subject<boolean>();

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authenticationService.getIsUserLogged().pipe(
      takeUntil(this.destroy$)
    ).subscribe(hasLogged => {this.isUserLoggedIn = hasLogged; console.log(this.isUserLoggedIn)});
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    console.log("ondestroy");
  }

  onRedirect(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void{
    this.authenticationService.logout();
    this.router.navigate(['auth/login']);
  }

}
