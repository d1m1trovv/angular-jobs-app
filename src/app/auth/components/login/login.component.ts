import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {

    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    const email = this.formGroup.value.email;
    const password = this.formGroup.value.password;

    this.authenticationService.login(email, password).pipe(
      take(1)
    ).subscribe(response => {
      if (!response) {

        return;
      }

      console.log(response.email);
      this.authenticationService.setLoggedUser(response);
      this.checkType(response.type!);
      console.log(response);
    });
  }

  checkType(type: string): void{
    if(type === 'standard'){
      this.router.navigate(['main/jobs']);
    }
    if(type === 'organization'){
      this.router.navigate(['organization/jobs']);
    }
  }

}
