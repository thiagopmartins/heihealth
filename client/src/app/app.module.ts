import { GraphQLModule } from './graphql/graphql.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApolloModule } from 'apollo-angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from "@clr/angular";
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { Ng2BRPipesModule } from 'ng2-brpipes';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';


import { AnamneseComponent } from './dashboard/anamnese/anamnese.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PacienteComponent } from './dashboard/paciente/paciente.component';
import { RegistroComponent } from './registro/registro.component';
import { SecretariaComponent } from './dashboard/secretaria/secretaria.component';
import { MinhacontaComponent } from './dashboard/minhaconta/minhaconta.component';
import { DialogService } from './dialog.service';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    DashboardComponent,
    PacienteComponent,
    SecretariaComponent,
    MinhacontaComponent,
    AnamneseComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    FormsModule,
    GraphQLModule,
    HttpModule,
    Ng2BRPipesModule,
    ReactiveFormsModule
  ],
  providers: [
    CookieService,
    DialogService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  exports: [Ng2BRPipesModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
