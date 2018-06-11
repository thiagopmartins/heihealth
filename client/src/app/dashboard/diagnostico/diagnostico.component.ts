import { Component, OnInit, ViewChild } from '@angular/core';
import { AnamneseModel } from '../../models/AnamneseModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../../dialog.service';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import { GraphQLError } from 'graphql';
import { QUERY_ANAMNESES } from '../../graphql/graphql.service';
import { ClrWizard } from "@clr/angular";

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {

  @ViewChild("wizardxl") wizardExtraLarge: ClrWizard;

  xlOpen: boolean = false;

  diagnosticos: AnamneseModel[] = [];
  diagnosticoSelecionado: AnamneseModel;
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
      sangue: [null],
      medicamentos: [null],
      descricao: [null],
      procedimento1: [null],
      data1: [null],
      procedimento2: [null],
      data2: [null], 
      procedimento3: [null],
      data3: [null],
      internacao1: [null],
      data_internacao1: [null],
      internacao2: [null],
      data_internacao2: [null], 
      internacao3: [null],
      data_internacao3: [null],
      fumante: [null],
      alcoolico: [null],
      drogas: [null],
      exercicio: [null],
      vezes: [null],
      diabetes: [null],
      adicional: [null],
      hipertensao: [null]
    });
    this.getAnamnese();
  }
  onTeste(): void {
    console.log(this.form)
  }
  onCreate(): void {
    this.xlOpen = true;
    this.editando = false;
    if (this.diagnosticoSelecionado) {
      this.diagnosticoSelecionado = null;
    }
    this.form.reset();
  }
  onEdit(): void {
    this.form.reset();
    this.editando = true;
    this.xlOpen = true;
    console.log(this.diagnosticoSelecionado);
    this.form.patchValue(this.diagnosticoSelecionado);
  }
  onSave(): void {
    this.xlOpen = false;
    if (!this.editando) {//create
      this.apollo.mutate({
        mutation: QUERY_ANAMNESES,
        variables: { input: this.form.value },
        context: {
          headers: new HttpHeaders().set('authorization', `Bearer ${this.cookie.get('token')}`)
        }
      })
        .toPromise()
        .then(({ data }) => {
          let anamnese: AnamneseModel;
          anamnese = this.form.value;
          anamnese.id = data['createAnamnese'].id;
          this.diagnosticos.push(anamnese);
          console.log(anamnese);
          
        })
        .catch((error: GraphQLError) => {
          console.log(error);
        });
    } else {
      this.apollo.mutate({
        mutation: QUERY_ANAMNESES,
        variables: {
          input: this.form.value,
          id: this.diagnosticoSelecionado.id
        },
        context: {
          headers: new HttpHeaders().set('authorization', `Bearer ${this.cookie.get('token')}`)
        }
      })
        .toPromise()
        .then(({ data }) => {
          let secretaria: AnamneseModel;
          secretaria = this.form.value;
          secretaria.id = this.diagnosticoSelecionado.id;
          this.diagnosticos.forEach((item, index) => {
            if (item.id === this.diagnosticoSelecionado.id) this.diagnosticos[`${index}`] = secretaria;
          });
          this.editando = false;
          this.diagnosticoSelecionado = null;
        })
        .catch((error: GraphQLError) => {
          console.log(error);
        });
    }
  }
  onDelete(): void {
    this.dialogService.confirm(`Deseja deletar o paciente ${this.diagnosticoSelecionado} ?`)
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.apollo.mutate({
            mutation: QUERY_ANAMNESES,
            variables: {
              id: this.diagnosticoSelecionado.id
            },
            context: {
              headers: new HttpHeaders().set('authorization', `Bearer ${this.cookie.get('token')}`)
            }
          })
            .toPromise()
            .then(({ data }) => {

              this.apollo.mutate({
                mutation: QUERY_ANAMNESES,
                variables: {
                  id: this.diagnosticoSelecionado.id
                },
                context: {
                  headers: new HttpHeaders().set('authorization', `Bearer ${this.cookie.get('token')}`)
                }
              })
                .toPromise()
                .then(({ data }) => {
                  if (data['deleteUserId']) {
                    this.diagnosticos.forEach((item, index) => {
                      if (item.id === this.diagnosticoSelecionado.id) this.diagnosticos.splice(index, 1);
                    });
                  }
                  this.diagnosticoSelecionado = null;
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
  getAnamnese(): void {
    this.apollo.query({
      query: QUERY_ANAMNESES,
      fetchPolicy: 'network-only'
    })
      .subscribe(({ data }) => {
        data['anamneses'].filter((result: AnamneseModel) => {
          this.diagnosticos.push(result);
        });
        console.log(data);
      });
  }
}
