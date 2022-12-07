import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { MovimentacaoAddComponent } from './movimentacao-add/movimentacao-add.component';
import { MovimentacaoListComponent } from './movimentacao-list/movimentacao-list.component';

const routes: Routes = [
  {path: 'movimentacao', component: LayoutComponent, children:[
    {path:'', title:'Movimentações', component: MovimentacaoListComponent},
    {path:'add', title:'Add Movimentação', component: MovimentacaoAddComponent},
    { path: '**', component: MovimentacaoListComponent }

  ], canActivate: [AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentacaoRoutingModule { }
