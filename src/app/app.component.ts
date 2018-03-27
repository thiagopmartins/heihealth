import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  loading = false;
  ngOnInit(): void{
    this.loading = true;
    console.log(this.loading);
  }
}
