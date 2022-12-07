import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { AdministradorAddComponent } from './administrador-add/administrador-add.component';
import { AdministradorDetailComponent } from './administrador-detail/administrador-detail.component';
import { AdministradorEditComponent } from './administrador-edit/administrador-edit.component';
import { AdministradorListComponent } from './administrador-list/administrador-list.component';

const routes: Routes = [
  {path: 'administrador', component: LayoutComponent, children:[
    {path:'', title:'Administradores', component: AdministradorListComponent},
    {path:'add', title:'Add Despesa', component: AdministradorAddComponent},
    {path: ':id', title:'Detalhes Administrador', component: AdministradorDetailComponent},
    {path: 'edit/:id', title:'Editar Depesa', component: AdministradorEditComponent},
    { path: '**', component: AdministradorListComponent }
    

  ], canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
