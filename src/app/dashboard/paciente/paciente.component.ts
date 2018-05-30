import { Router } from '@angular/router';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PacienteModel } from './PacienteModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../../dialog.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {


  pacientes: PacienteModel[] = [];
  pacienteSelecionado: PacienteModel;

  form: FormGroup;
  basic: boolean;
  editando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: [],
      nome: [''],
      sexo: [],
      cpf: ['', Validators.compose([Validators.required, Validators.pattern(/[0-9]/)])],
      telefone: [''],
      nascimento: [''],
      endereco: [''],
      cep: [],
      bairro: [''],
      numero: [],
      cidade: [''],
      uf: ['']
    });
    console.log(this.form);
  }

  onCreate(): void {
    this.basic = true;
    this.editando = false;
    if (this.pacienteSelecionado) {
      this.pacienteSelecionado = null;
    }
    this.form.controls['nome'].setValue('');
    this.form.controls['cpf'].setValue('');
    this.form.controls['telefone'].setValue('');

  }
  onEdit(): void {
    this.editando = true;
    this.basic = true;
    this.form.controls['nome'].setValue(this.pacienteSelecionado.nome);
    this.form.controls['cpf'].setValue(this.pacienteSelecionado.cpf);
    this.form.controls['telefone'].setValue(this.pacienteSelecionado.telefone);
  }
  onSave(): void {
    this.basic = false;
    let pacienteId: number;
    if (this.editando)
      pacienteId = this.pacienteSelecionado.id - 1;
    else
      (this.pacientes.length == undefined ? pacienteId = 0 : pacienteId = this.pacientes.length);

    this.pacientes[`${pacienteId}`] = {
      id: (pacienteId + 1),
      nome: this.form.controls['nome'].value,
      cpf: this.form.controls['cpf'].value,
      telefone: this.form.controls['telefone'].value
    }
    console.log(this.form);
    this.pacienteSelecionado = null;
  }
  onDelete(): void {
    this.dialogService.confirm(`Deseja deletar o paciente ${this.pacienteSelecionado.nome} ?`)
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.pacientes.forEach((item, index) => {
            if (item.id === this.pacienteSelecionado.id) this.pacientes.splice(index, 1);
          });
          this.pacienteSelecionado = null;
        }
      });
  }
}

