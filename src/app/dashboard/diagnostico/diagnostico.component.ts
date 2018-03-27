import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {

  users: Array<{paciente: string, medico: string, diagnostico: string, data: string}>;

  constructor() { }

  ngOnInit() {
    this.users = [];
    this.users.push({
      paciente: 'Thiago Pereira Martins',
      medico: 'Nome do Médico',
      diagnostico: 'Gripe',
      data: '27/03/2018'
    });
    this.users.push({
      paciente: 'Henrique Mesquita',
      medico: 'Nome do Médico',
      diagnostico: 'Gripe A',
      data: '24/03/2018'
    });    
  
  }
}
