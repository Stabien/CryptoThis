import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-init';
  test = "/user";

  switchRoutes() {
    if (this.test === "/")
      this.test = "/user";
    else
      this.test = "/";
  }
}
