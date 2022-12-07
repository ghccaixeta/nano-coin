import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from '../model/funcionario';
import { FuncionarioService } from '../service/funcionario.service';

declare var $:any

@Component({
  selector: 'app-funcionario-edit',
  templateUrl: './funcionario-edit.component.html',
  styleUrls: ['./funcionario-edit.component.css']
})
export class FuncionarioEditComponent implements OnInit {

  funcionario: Funcionario;
  
  id?: number;
  isEmpty?: boolean;
  errors?: String[];
  show = false;

  btnDisabled?: boolean;

  reloadSpinner?: boolean;

  constructor(
    private router: Router,
    private service: FuncionarioService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.funcionario = new Funcionario
    
   }

  ngOnInit(): void {
    $(".showtoast").click(function(){
      $('.toast').toast('show');
      });
      
    
    let params = this.activatedRoute.params;
    params.subscribe(urlParams =>{
      this.id = Number(urlParams['id']) ;
      this.service.getFuncionarioById(this.id).subscribe({
        next:(r) => this.funcionario = r,
        error:()=>this.router.navigate([`/funcionario`]),
      })
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

  validateObj(funcionario: Funcionario){
    if(funcionario.nome_completo && funcionario.login && funcionario.senha){
      return true
    }
    this.isEmpty = true
    return false
  }

  onSubmit(){
    this.validate();
    
    if (this.validateObj(this.funcionario)){
      this.btnDisabled = true;
      this.service
      .update(this.funcionario)
      .subscribe({
        next: (v) => {
          this.router.navigate([`/funcionario/${this.funcionario.id}`],{ state: { ce: 'put' } })
        },
        error: (e)=> {
          this.btnDisabled = false;
          this.errors = e.error.message
          
        },
      });
      
    }
      
    
    
  }

}
