import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioListComponent } from './funcionario-list/funcionario-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FuncionarioDetailComponent } from './funcionario-detail/funcionario-detail.component';
import { FuncionarioAddComponent } from './funcionario-add/funcionario-add.component';
import { FuncionarioEditComponent } from './funcionario-edit/funcionario-edit.component';
import { FuncionarioExtratoComponent } from './funcionario-extrato/funcionario-extrato.component';
import { FormatMovimentacaoPipe } from './pipe/format-movimentacao.pipe';




@NgModule({
  declarations: [
    FuncionarioListComponent,
    FuncionarioDetailComponent,
    FuncionarioAddComponent,
    FuncionarioEditComponent,
    FuncionarioExtratoComponent,
    FormatMovimentacaoPipe
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    NgbModule,
    FormsModule
  ]
})
export class FuncionarioModule { }
