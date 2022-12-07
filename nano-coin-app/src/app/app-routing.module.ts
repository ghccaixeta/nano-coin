import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'', component: LayoutComponent, canActivate: [AuthGuard], children:[
    {path: '', redirectTo: '/movimentacao', pathMatch: 'full'},
  ]},
  {path:'login', title:'Login', component: LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
