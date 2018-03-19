import { Title } from '@angular/platform-browser';
import { SecretariaComponent } from './dashboard/secretaria/secretaria.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PacienteComponent } from './dashboard/paciente/paciente.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from "./login/login.component";
import { RegistroComponent } from './registro/registro.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registro',
        component: RegistroComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: '/dashboard/paciente',
                pathMatch: 'full'
            },
            {
                path: 'paciente',
                component: PacienteComponent,
                data: {
                    title: 'Gestão de Pacientes'
                }
            },
            {
                path: 'secretaria',
                component: SecretariaComponent,
                data: {
                    title: 'Gestão de Secretarias'
                }
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}