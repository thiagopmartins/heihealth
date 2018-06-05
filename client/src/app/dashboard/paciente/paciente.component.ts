import gql from 'graphql-tag';
import { QUERY_PACIENTES, MUTATION_DELETE_PACIENTE } from './../../graphql/graphql.service';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../../dialog.service';
import { PacienteModel } from '../../models/PacienteModel';

import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import { GraphQLError } from 'graphql';



@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {


  pacientes: PacienteModel[] = [];
  pacienteSelecionado: PacienteModel;

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
    this.form = this.fb.group({
      id: [],
      nome: ['', Validators.required],
      cpf: ['', Validators.compose([Validators.required, Validators.pattern(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/)])],
      telefone: ['', Validators.required],
      nascimento: [''],
      endereco: [''],
      cep: [''],
      bairro: [''],
      numero: [],
      cidade: [''],
      uf: [''],
      sexo: ['']
    });
    this.monitorar();
    this.getPacientes();
  }
  monitorar(): void {
    this.form.get('cpf').valueChanges.subscribe(() => {
      if (this.form.get('cpf').invalid)
        (this.form.get('cpf').errors.required ? this.erro['cpf'] = "CPF obrigatório" : this.erro['cpf'] = "CPF inválido");
    });
    this.form.get('nome').valueChanges.subscribe(() => {
      if (this.form.get('nome').invalid)
        (this.form.get('nome').errors.required ? this.erro['nome'] = "Nome obrigatório" : this.erro['nome'] = "Nome inválido");
    });
    this.form.get('telefone').valueChanges.subscribe(() => {
      if (this.form.get('telefone').invalid)
        (this.form.get('telefone').errors.required ? this.erro['telefone'] = "Telefone obrigatório" : this.erro['telefone'] = "Telefone inválido");
    });
  }
  onCreate(): void {
    this.basic = true;
    this.editando = false;
    if (this.pacienteSelecionado) {
      this.pacienteSelecionado = null;
    }
    this.form.reset();
  }
  onEdit(): void {
    this.form.reset();
    this.editando = true;
    this.basic = true;
    this.form.patchValue(this.pacienteSelecionado);
  }
  onSave(): void {
    this.basic = false;

  }
  onDelete(): void {
    this.dialogService.confirm(`Deseja deletar o paciente ${this.pacienteSelecionado.nome} ?`)
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.apollo.mutate({
            mutation: MUTATION_DELETE_PACIENTE,
            variables:{
              id: this.pacienteSelecionado.id
            },
            context: {
              headers: new HttpHeaders().set('authorization', `Bearer ${this.cookie.get('token')}`)
            }
          })
          .toPromise()
          .then(({ data }) => {
            if(data['deletePaciente']){
              this.pacientes.forEach((item, index) => {
                if (item.id === this.pacienteSelecionado.id) this.pacientes.splice(index, 1);
              });
              this.pacienteSelecionado = null;
            }
            
          })
          .catch((error: GraphQLError) => {
            console.log(error);
            let cStat = error.message.split(/:/)[1].trim();
            switch(cStat){
              case 'TokenExpiredError': {
                this.router.navigate(['/']);
                break
              }
            }  
          })           
        }
      });
  }
  getPacientes(): void{
    this.apollo.query({
      query: QUERY_PACIENTES
    })
    .subscribe(({ data }) => {   
      //this.pacientes.length = 0;
      data['pacientes'].filter((result: PacienteModel) => {
        this.pacientes.push(result);
      });
    });
  }
  
}