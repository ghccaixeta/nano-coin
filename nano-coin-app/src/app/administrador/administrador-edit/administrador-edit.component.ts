import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrador } from '../model/administrador';
import { AdministradorService } from '../service/administrador.service';

declare var $:any

@Component({
  selector: 'app-administrador-edit',
  templateUrl: './administrador-edit.component.html',
  styleUrls: ['./administrador-edit.component.css']
})
export class AdministradorEditComponent implements OnInit {

  administrador: Administrador;
  
  id?: number;
  isEmpty?: boolean;
  errors?: String[];
  show = false;

  btnDisabled?: boolean;

  reloadSpinner?: boolean;

  constructor(
    private router: Router,
    private service: AdministradorService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.administrador = new Administrador
    
   }

  ngOnInit(): void {
    $(".showtoast").click(function(){
      $('.toast').toast('show');
      });
      
    
    let params = this.activatedRoute.params;
    params.subscribe(urlParams =>{
      this.id = Number(urlParams['id']) ;
      this.service.getById(this.id).subscribe({
        next:(r) => this.administrador = r,
        error:()=>this.router.navigate([`/administrador`]),
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

  validateObj(administrador: Administrador){
    if(administrador.nome_completo && administrador.login && administrador.senha){
      return true
    }
    this.isEmpty = true
    return false
  }

  onSubmit(){
    this.validate();
    
    if (this.validateObj(this.administrador)){
      this.btnDisabled = true;
      this.service
      .update(this.administrador)
      .subscribe({
        next: (v) => {
          this.router.navigate([`/administrador/${this.administrador.id}`],{ state: { ce: 'put' } })
        },
        error: (e)=> {
          this.btnDisabled = false;
          this.errors = e.error.message
          
        },
      });
      
    }
      
    
    
  }

}
