import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, EmailValidator, FormBuilder } from '@angular/forms';
import { UsuarioModel } from '../models/UsuarioModel';
import { Router } from '@angular/router'
import { Apollo } from 'apollo-angular'

import gql from 'graphql-tag'


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registro: FormGroup;
  erro: string[] = [];
  basic: boolean;
  editando: boolean = false;
  submitLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apollo: Apollo
  ) { }
  submitted = false;
  onSubmit() {
    if (!this.submitLoading){
      this.submitLoading = true;
      this.apollo
        .mutate({
          mutation: gql`
            mutation createUser($input: UserCreateInput!) {
              createUser(input: $input) {
                id
              }
            }
          `,
          variables: {
            input: this.registro.value
          },
        })
        .toPromise()
        .then((id) => {
          this.router.navigate(['/']);
          this.submitLoading = false;
          console.log(id);
        })
        .catch((error) => {
          this.submitLoading = false;
          console.log(error);
        });
    }
  }

  ngOnInit() {
    this.registro = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      crm: [null, Validators.required],
      password: [null, Validators.required]
    });
    this.registro.reset();
  }

}
