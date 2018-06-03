import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateLoading: boolean = false;
  submitLoading: boolean = false;

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
  }

  logar(): void {
    this.submitLoading = true;
    this.route.navigate(['/dashboard']);
    this.submitLoading = false;
  } 
}
