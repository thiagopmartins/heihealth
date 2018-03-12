import { RegistroComponent } from './registro/registro.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";

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
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes,{useHash:true})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}