import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../auth/models/user.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JobsService} from "../jobs/services/jobs.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../auth/services/authentication.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit, OnDestroy {

  user: User;
  formGroup: FormGroup = this.formBuilder.group({});

  destroy$ = new Subject<boolean>();

  constructor(private formBuilder: FormBuilder,
              private jobsService: JobsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {
    this.user = {
      displayName: '',
      username: '',
      email: '',
      password: '',
      type: ''
    }

    this.buildForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      const id = params.id;

      if(id){
        this.getUser(id);
      }
    })

    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void{
    const user: User = {
      ...this.formGroup.value,
      id: this.user.id
    }

    if(user.id){
      this.authenticationService.updateUser(user).pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.router.navigate(['main/profile']);
      })
    }
  }

  getUser(id: number): void{
    this.authenticationService.getUser(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      this.user = response;

      this.buildForm();
    })
  }

  buildForm(): void{
    this.formGroup = this.formBuilder.group({
      displayName: [this.user.displayName, [Validators.required, Validators.minLength(5)]],
      username: [this.user.username, [Validators.required, Validators.minLength(5)]],
      email: [this.user.email, Validators.required],
      password: [this.user.password, [Validators.required]],
    });
  }

}
