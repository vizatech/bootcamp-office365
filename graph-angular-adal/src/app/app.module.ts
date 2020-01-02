import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationGuard, MsAdalAngular6Module } from 'microsoft-adal-angular6';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsAdalAngular6Module.forRoot({
      tenant: "vitalyzhukov.com", // Укажите TenantId
      clientId: "9b243cc3-24ca-4fb7-9075-17b07a1f2bf3", // Укажите ClientId
      redirectUri: "http://localhost:4200",
      endpoints: {
        "http://localhost:4200": "9b243cc3-24ca-4fb7-9075-17b07a1f2bf3"
      },
      navigateToLoginRequestUrl: false,
      cacheLocation: "localStorage"
    })
  ],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
