import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor() { }

  employeeAddressForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    address: new FormGroup({
      postalCode: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    })
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
