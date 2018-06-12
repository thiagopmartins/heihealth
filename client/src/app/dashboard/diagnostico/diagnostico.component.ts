import { Component, OnInit, ViewChild } from '@angular/core';
import { AnamneseModel } from '../../models/AnamneseModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../../dialog.service';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import { GraphQLError } from 'graphql';
import { QUERY_ANAMNESES, MUTATION_CREATE_ANAMNESE } from '../../graphql/graphql.service';
import { ClrWizard, ClrWizardPage } from "@clr/angular";

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {

  @ViewChild("wizardxl") wizardExtraLarge: ClrWizard;
  @ViewChild("finish") lastPage: ClrWizardPage;

  xlOpen: boolean = false;

  anamneses: AnamneseModel[] = [];
  anamneseSelecionada: AnamneseModel;
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
  onCreate(): void {
    this.xlOpen = true;
    this.editando = false;
    if (this.anamneseSelecionada) {
      this.anamneseSelecionada = null;
    }
    this.form.reset();
  }
  onEdit(): void {
    this.form.reset();
    this.editando = true;
    this.xlOpen = true;
    this.form.patchValue(JSON.parse(atob(this.anamneseSelecionada.conteudo)));
  }
  onSave(): void {
    this.xlOpen = false;
    let anamneseValor: AnamneseModel = {
      conteudo: btoa(JSON.stringify(this.form.value)),
      medico_id: parseInt(this.cookie.get('userID')),
      paciente_id: 20
    }
    if (!this.editando) {//create
      this.apollo.mutate({
        mutation: MUTATION_CREATE_ANAMNESE,
        variables: { input: anamneseValor },
        context: {
          headers: new HttpHeaders().set('authorization', `Bearer ${this.cookie.get('token')}`)
        }
      })
        .toPromise()
        .then(({ data }) => {
          console.log(anamneseValor);
          anamneseValor.id = data['createAnamnese'].id;
          this.anamneses.push(anamneseValor);
        })
        .catch((error: GraphQLError) => {
          console.log(error);
        });
    }
    this.doReset();
  }
  onDelete(): void {
    this.dialogService.confirm(`Deseja deletar o paciente ${this.anamneseSelecionada} ?`)
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.apollo.mutate({
            mutation: QUERY_ANAMNESES,
            variables: {
              id: this.anamneseSelecionada.id
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
                  id: this.anamneseSelecionada.id
                },
                context: {
                  headers: new HttpHeaders().set('authorization', `Bearer ${this.cookie.get('token')}`)
                }
              })
                .toPromise()
                .then(({ data }) => {
                  if (data['deleteUserId']) {
                    this.anamneses.forEach((item, index) => {
                      if (item.id === this.anamneseSelecionada.id) this.anamneses.splice(index, 1);
                    });
                  }
                  this.anamneseSelecionada = null;
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
          this.anamneses.push(result);
        });
      });
  }
  doReset(): void {
    this.wizardExtraLarge.reset();
  }
}
