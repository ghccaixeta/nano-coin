import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Funcionario } from '../model/funcionario';
import { FuncionarioService } from '../service/funcionario.service';

declare var $:any

@Component({
  selector: 'app-funcionario-add',
  templateUrl: './funcionario-add.component.html',
  styleUrls: ['./funcionario-add.component.css']
})
export class FuncionarioAddComponent implements OnInit {

  funcionario: Funcionario;
  errors?: String[];
  

  show = false;
  isEmpty?: boolean;
  pSuccess?: boolean;
  funcionarioName?: String;
  funcionarioId?: Number

  btnDisabled?: boolean;
  saveSpinner?: boolean;
  saveNewSpinner?: boolean;

  constructor(
    private service: FuncionarioService,
    private authService: AuthService,
    private router: Router,
  ) { 
    this.funcionario = new Funcionario;
  }

  ngOnInit(): void {
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
    this.isEmpty = Object.values(this.funcionario).every(value => {
      if (!value) {
        return true;
      }
      this.btnDisabled = true;
      return false;
    });

    if (!this.isEmpty){
      this.funcionario.administrador_id = await this.authService.getUserId()
      this.pSuccess = false;
      type == 'save' ? this.saveSpinner = true : this.saveNewSpinner = true;
      this.service
      .save(this.funcionario)
      .subscribe({
        next: (v) => {
          if(type == 'save'){
            this.saveSpinner = false;
            this.router.navigate([`/funcionario/${v.id}`],{ state: { ce: 'post' } })
          }else{
            this.btnDisabled = false;
            this.saveNewSpinner = false
            this.pSuccess = true;
            this.funcionarioName = this.funcionario.nome_completo;
            this.funcionarioId = v.id;
            this.funcionario = new Funcionario;
            
            
          }
          
        },
        error: (e)=> {
          this.btnDisabled = false;
          this.saveSpinner = false;
          this.saveNewSpinner = false;
          this.errors = e.error.message
          
        },
      });
      
    }else{
      this.errors = ["Login já existe"]
      this.pSuccess = false;
    }
      
    
    
  }

}
