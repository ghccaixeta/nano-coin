import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacaoRoutingModule } from './movimentacao-routing.module';
import { MovimentacaoListComponent } from './movimentacao-list/movimentacao-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MovimentacaoAddComponent } from './movimentacao-add/movimentacao-add.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormatMovimentacaoPipe } from './pipe/format-movimentacao.pipe';

@NgModule({
  declarations: [
    MovimentacaoListComponent,
    MovimentacaoAddComponent,
    FormatMovimentacaoPipe
  ],
  imports: [
    CommonModule,
    MovimentacaoRoutingModule,
    NgbModule,
    FormsModule,
    NgxMaskModule.forChild(),
  ]
})
export class MovimentacaoModule { }
