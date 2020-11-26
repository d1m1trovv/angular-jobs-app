import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {map, take} from "rxjs/operators";
import {User} from "../../models/user.interface";


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  formGroup: FormGroup = this.formBuilder.group({});

  error: string = '';
  userType: string = '';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildForm();
    this.checkUrl();
  }

  onSubmit(): void{
    const user = {
      ...this.formGroup.value,
      type: this.userType
    }

    if(user.password !== user.confirmPassword){

      this.error = 'Passwords do not match'

      this.formGroup.reset({
        displayName: user.displayName,
        username: user.username,
        email: user.email,
        password: '',
        confirmPassword: ''
      });

      return;
    }

    this.authenticationService.getUsers().pipe(
      map((stream: User[]) => stream.find(
        u => u.username === user.username
      || u.email === user.email)),
      take(1)
    ).subscribe((response) => {
      if(response){

        this.error = 'Username or email are already taken'

        return;
      }

    this.authenticationService.register(user).pipe(
      take(1)
    ).subscribe(() => {
      this.router.navigate(['auth/login'])
    });

    });
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      displayName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  private checkUrl(): void{
    if(this.activatedRoute.snapshot.url.join('/') === 'sign-up/user'){
      this.userType = 'standard';
    }
    if(this.activatedRoute.snapshot.url.join('/') === 'sign-up/organization'){
      this.userType = 'organization';
    }
  }

}
