import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { AdministradorListComponent } from './administrador-list/administrador-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AdministradorDetailComponent } from './administrador-detail/administrador-detail.component';
import { AdministradorAddComponent } from './administrador-add/administrador-add.component';
import { AdministradorEditComponent } from './administrador-edit/administrador-edit.component';


@NgModule({
  declarations: [
    AdministradorListComponent,
    AdministradorDetailComponent,
    AdministradorAddComponent,
    AdministradorEditComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    NgbModule,
    FormsModule
  ]
})
export class AdministradorModule { }
