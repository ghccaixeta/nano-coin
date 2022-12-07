import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { FuncionarioAddComponent } from './funcionario-add/funcionario-add.component';
import { FuncionarioDetailComponent } from './funcionario-detail/funcionario-detail.component';
import { FuncionarioEditComponent } from './funcionario-edit/funcionario-edit.component';
import { FuncionarioExtratoComponent } from './funcionario-extrato/funcionario-extrato.component';
import { FuncionarioListComponent } from './funcionario-list/funcionario-list.component';


const routes: Routes = [
  {path: 'funcionario', component: LayoutComponent, children:[
    {path:'', title:'Funcionarios', component: FuncionarioListComponent},
    {path:'add', title:'Add Despesa', component: FuncionarioAddComponent},
    {path: ':id', title:'Detalhes Funcionario', component: FuncionarioDetailComponent},
    {path: 'edit/:id', title:'Editar Depesa', component: FuncionarioEditComponent},
    {path: 'extrato/:id', title:'Extrato', component: FuncionarioExtratoComponent},
    { path: '**', component: FuncionarioListComponent }
    
  ], canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
