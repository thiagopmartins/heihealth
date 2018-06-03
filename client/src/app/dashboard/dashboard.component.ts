import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title: String;

  constructor(
    private router: Router,
    private activiteRouter: ActivatedRoute
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.title = this.activiteRouter.firstChild.data['value'].title
      }
    });
  }
  ngOnInit() {

  }
}
