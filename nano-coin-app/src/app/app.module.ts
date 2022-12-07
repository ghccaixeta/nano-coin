import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from './template/template.module';
import {FormsModule} from '@angular/forms';
import { TokenInterceptor } from './token/token.interceptor';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './service/auth.service';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { MovimentacaoModule } from './movimentacao/movimentacao.module';
import { registerLocaleData } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import ptBr from '@angular/common/locales/pt';
import { AdministradorModule } from './administrador/administrador.module';



registerLocaleData(ptBr);

const maskConfig: Partial<IConfig> = {
  allowNegativeNumbers: false,
  decimalMarker: ',',
  thousandSeparator: '.',

  
};

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TemplateModule,
    AdministradorModule,
    FuncionarioModule,
    MovimentacaoModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgxMaskModule.forRoot(maskConfig)
    
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
