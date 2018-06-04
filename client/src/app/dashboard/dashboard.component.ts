import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title: String;
  email: String;

  constructor(
    private router: Router,
    private activiteRouter: ActivatedRoute,
    private cookie: CookieService
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.title = this.activiteRouter.firstChild.data['value'].title
      }
    });
  }
  ngOnInit() {
    this.email = this.cookie.get('email');
  }
  deslogar(): void{
    this.cookie.deleteAll();
  }
}
