import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, EmailValidator } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor() { }

  employeeAddressForm = new FormGroup({
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
    resenha: new FormControl('', Validators.required),
    email_format: new FormControl('', Validators.email)
  });
  submitted = false;
  onSubmit() {
  }
  addNewEmployeeAddress() {
    this.employeeAddressForm.reset();
    this.submitted = false;
  }

  ngOnInit() {
  }

}
