import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { FuncionarioService } from 'src/app/funcionario/service/funcionario.service';
import { AuthService } from 'src/app/service/auth.service';
import { Movimentacao } from '../model/movimentacao';
import { MovimentacaoService } from '../service/movimentacao.service';

declare var $:any

@Component({
  selector: 'app-movimentacao-add',
  templateUrl: './movimentacao-add.component.html',
  styleUrls: ['./movimentacao-add.component.css']
})
export class MovimentacaoAddComponent implements OnInit {

  movimentacao: Movimentacao;
  funcionarios: Funcionario[] = [];
  errors?: String[];
  

  show = false;
  isEmpty?: boolean;
  pSuccess?: boolean;
  movimentacaoName?: String;
  movimentacaoId?: Number

  btnDisabled?: boolean;
  saveSpinner?: boolean;
  saveNewSpinner?: boolean;
  reloadSpinner?: boolean

  constructor(
    private service: MovimentacaoService,
    private funcionarioService: FuncionarioService,
    private authService: AuthService,
    private router: Router,
  ) { 
    this.movimentacao = new Movimentacao;
  }

  ngOnInit(): void {
    this.getFuncionarios()
    $(".showtoast").click(function(){
      $('.toast').toast('show');
      })
  }

  validate(){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    form.addEventListener('submit', function (event: { preventDefault: () => void; stopPropagation: () => void; }) {
                if (!form.checkValidity()) {
                  event.preventDefault()
                  event.stopPropagation()
                  form.classList.add('was-validated');
                  
                }else{
                  form.classList.remove('was-validated')
                }
              }, false)
    
    
  }

  async onSubmit(type: string){
    this.validate();
    this.isEmpty = Object.values(this.movimentacao).every(value => {
      if (!value) {
        return true;
      }
      this.btnDisabled = true;
      return false;
    });

    if (!this.isEmpty){
      this.movimentacao.administrador_id = await this.authService.getUserId()
      this.pSuccess = false;
      type == 'save' ? this.saveSpinner = true : this.saveNewSpinner = true;
      this.service
      .save(this.movimentacao)
      .subscribe({
        next: (v) => {
          if(type == 'save'){
            this.saveSpinner = false;
            this.router.navigate(['/movimentacao'],{ state: { ce: 'post' } })
          }else{
            this.btnDisabled = false;
            this.saveNewSpinner = false
            this.pSuccess = true;
            this.movimentacaoName = this.movimentacao.observacao;
            this.movimentacaoId = v.id;
            this.movimentacao = new Movimentacao;
            this.validate()
            
            
          }
          
        },
        error: (e)=> {
          this.btnDisabled = false;
          this.saveSpinner = false;
          this.saveNewSpinner = false;
          this.errors = e
          
        },
      });
      
    }else{
      this.pSuccess = false;
    }
      
    
    
  }

  getFuncionarios(){
    this.reloadSpinner = true;
    this.funcionarioService.getCountFuncionario().subscribe({
      next: (v)=>{
        this.funcionarioService.getFuncionario('1', v.toString()).subscribe((data: Funcionario[]) => {
          this.funcionarios = data;
          this.reloadSpinner = false;
        });
        
      }
    })
  }

}
