import { Component } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Global Microsoft 365 Developer Bootcamp';
  userInfo = null;

  constructor(private adalSvc: MsAdalAngular6Service) {
    this.userInfo = this.adalSvc.userInfo;
    this.adalSvc.acquireToken('https://graph.microsoft.com');
  }
}
