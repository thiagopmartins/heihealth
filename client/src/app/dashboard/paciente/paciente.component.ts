import { Router } from '@angular/router';
import { Component, OnInit, SimpleChanges } from '@angular/core';
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
  erro: string[] = [];
  basic: boolean;
  editando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService
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
  }
  monitorar(): void {
    this.form.get('cpf').valueChanges.subscribe(() => {
      if(this.form.get('cpf').invalid)
        (this.form.get('cpf').errors.required ? this.erro['cpf'] = "CPF obrigatório" : this.erro['cpf'] = "CPF inválido");
    });
    this.form.get('nome').valueChanges.subscribe(() => {
      if(this.form.get('nome').invalid)
        (this.form.get('nome').errors.required ? this.erro['nome'] = "Nome obrigatório" : this.erro['nome'] = "Nome inválido");
    });   
    this.form.get('telefone').valueChanges.subscribe(() => {
      if(this.form.get('telefone').invalid)
        (this.form.get('telefone').errors.required ? this.erro['telefone'] = "Telefone obrigatório" : this.erro['telefone'] = "Telefone inválido");
    });      
    console.log(this.erro);
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
    let pacienteId: number;
    if (this.editando)
      pacienteId = this.pacienteSelecionado.id - 1;
    else
      (this.pacientes.length == undefined ? pacienteId = 0 : pacienteId = this.pacientes.length);

    this.pacientes[`${pacienteId}`] = this.form.value;
    console.log(this.pacientes);
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

