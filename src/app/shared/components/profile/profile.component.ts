import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../auth/models/user.interface";
import {AuthenticationService} from "../../../auth/services/authentication.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User;

  destroy$ = new Subject<boolean>();

  constructor(private authenticationService: AuthenticationService) {
    this.user = {
      displayName: '',
      username: '',
      email: '',
      password: '',
      type: ''
    }
  }

  ngOnInit(): void {
    this.getUser(this.authenticationService.getLoggedUser().id!);
  }

  ngOnDestroy(): void{
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getUser(id: number): void{
    this.authenticationService.getUser(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      this.user = response;
    })
  }

}
