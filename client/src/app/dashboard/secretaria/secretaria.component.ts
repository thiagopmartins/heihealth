import { UsuarioModel } from './../../models/UsuarioModel';

import { MUTATION_CREATE_USUARIO, MUTATION_CREATE_SECRETARIA, QUERY_SECRETARIAS, QUERY_PACIENTES, QUERY_USER, MUTATION_UPDATE_USER, MUTATION_DELETE_USER_ID, MUTATION_DELETE_SECRETARIA } from './../../graphql/graphql.service';
import { GraphQLError } from 'graphql';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { DialogService } from './../../dialog.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SecretariaModel } from '../../models/SecretariaModel';
import { throws } from 'assert';

@Component({
  selector: 'app-secretaria',
  templateUrl: './secretaria.component.html',
  styleUrls: ['./secretaria.component.css']
})
export class SecretariaComponent implements OnInit {

  secretarias: UsuarioModel[] = [];

  secretariaSelecionada: UsuarioModel;

  form: FormGroup;
  erro: string[] = [];
  basic: boolean;
  editando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private router: Router,
    private apollo: Apollo,
    private cookie: CookieService

  ) { }

  ngOnInit() {

    if (this.cookie.get('previlegios') == 'false') {
      this.router.navigate(['/dashboard']);
      throw new Error('Usuário sem permissão!!');
    }

    this.form = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
    this.getSecretarias();
  }
  onCreate(): void {
    this.basic = true;
    this.editando = false;
    if (this.secretariaSelecionada) {
      this.secretariaSelecionada = null;
    }
    this.form.reset();
  }
  onEdit(): void {
    this.form.reset();
    this.editando = true;
    this.basic = true;
    console.log(this.secretariaSelecionada);
    this.form.patchValue(this.secretariaSelecionada);
  }
  onSave(): void {
    this.basic = false;
    if (!this.editando) {//create
      this.apollo.mutate({
        mutation: MUTATION_CREATE_USUARIO,
        variables: { input: this.form.value },
        context: {
          headers: new HttpHeaders().set('authorization', `Bearer ${this.cookie.get('token')}`)
        }
      })
        .toPromise()
        .then(({ data }) => {
          let secretaria: UsuarioModel;
          secretaria = this.form.value;
          secretaria.id = data['createUser'].id;
          this.secretarias.push(secretaria);
          console.log(secretaria);
          this.apollo.mutate({
            mutation: MUTATION_CREATE_SECRETARIA,
            variables: {
              input: {
                user_id: secretaria.id,
                medico_id: this.cookie.get('userID')
              }
            },
            context: {
              headers: new HttpHeaders().set('authorization', `Bearer ${this.cookie.get('token')}`)
            }
          })
            .toPromise()
            .then(({ data }) => {
              this.editando = false;
              this.secretariaSelecionada = null;
              console.log(data);
            })
        })
        .catch((error: GraphQLError) => {
          console.log(error);
        });
    } else {
      this.apollo.mutate({
        mutation: MUTATION_UPDATE_USER,
        variables: {
          input: this.form.value,
          id: this.secretariaSelecionada.id
        },
        context: {
          headers: new HttpHeaders().set('authorization', `Bearer ${this.cookie.get('token')}`)
        }
      })
        .toPromise()
        .then(({ data }) => {
          let secretaria: UsuarioModel;
          secretaria = this.form.value;
          secretaria.id = this.secretariaSelecionada.id;
          this.secretarias.forEach((item, index) => {
            if (item.id === this.secretariaSelecionada.id) this.secretarias[`${index}`] = secretaria;
          });
          this.editando = false;
          this.secretariaSelecionada = null;
        })
        .catch((error: GraphQLError) => {
          console.log(error);
        });
    }
  }
  onDelete(): void {
    this.dialogService.confirm(`Deseja deletar o paciente ${this.secretariaSelecionada.name} ?`)
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.apollo.mutate({
            mutation: MUTATION_DELETE_SECRETARIA,
            variables: {
              id: this.secretariaSelecionada.id
            },
            context: {
              headers: new HttpHeaders().set('authorization', `Bearer ${this.cookie.get('token')}`)
            }
          })
            .toPromise()
            .then(({ data }) => {

                this.apollo.mutate({
                  mutation: MUTATION_DELETE_USER_ID,
                  variables: {
                    id: this.secretariaSelecionada.id
                  },
                  context: {
                    headers: new HttpHeaders().set('authorization', `Bearer ${this.cookie.get('token')}`)
                  }
                })
                  .toPromise()
                  .then(({ data }) => {
                    if (data['deleteUserId']) {
                      this.secretarias.forEach((item, index) => {
                        if (item.id === this.secretariaSelecionada.id) this.secretarias.splice(index, 1);
                      });
                    }
                    this.secretariaSelecionada = null;
                  })              
            })
            .catch((error: GraphQLError) => {
              console.log(error);
              let cStat = error.message.split(/:/)[1].trim();
              switch (cStat) {
                case 'TokenExpiredError': {
                  this.router.navigate(['/']);
                  break
                }
              }
            })
        }
      });
  }
  getSecretarias(): void {
    this.apollo.query({
      query: QUERY_SECRETARIAS,
      variables: { id: this.cookie.get('userID') },
      fetchPolicy: 'network-only'
    })
      .subscribe(({ data }) => {
        //this.pacientes.length = 0;
        console.log(data);
        for (const key of data['secretarias']) {
          this.apollo.query({
            query: QUERY_USER,
            variables: { id: key.user_id },
            fetchPolicy: 'network-only'
          })
            .subscribe(({ data }) => {
              this.secretarias.push(data['user']);
              console.log(data);

            });
        }
      });
  }

}
