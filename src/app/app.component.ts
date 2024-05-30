import { Component } from '@angular/core';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Simple Login and Registration app';

  constructor() {
    console.log(process.env['PI_KEY'])
  }
}
