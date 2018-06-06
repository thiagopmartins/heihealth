import { MUTATION_CREATE_TOKEN } from './../graphql/graphql.service';
import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import gql from 'graphql-tag';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  login: FormGroup;
  submitLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apollo: Apollo,
    private cookie: CookieService
  ) { }

  onSubmit() {
    if (!this.submitLoading){
      this.submitLoading = true;
      this.apollo
        .mutate({
          mutation: MUTATION_CREATE_TOKEN,
          variables: {
            email: this.login.get('email').value,
            password: this.login.get('password').value
          },
          context: {
            headers: new HttpHeaders().set('authorization', `Bearer ${this.cookie.get('token')}`)
          }
        })
        .toPromise()
        .then((token) => {
          this.router.navigate(['/dashboard']);
          this.submitLoading = false;
          console.log(token.data['createToken'].token);
          this.cookie.set('token', token.data['createToken'].token);
          this.cookie.set('email', this.login.get('email').value);
        })
        .catch((error) => {
          this.submitLoading = false;
        });
    }
  }

  ngOnInit() {
    this.login = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
    this.login.reset();
  }

}
