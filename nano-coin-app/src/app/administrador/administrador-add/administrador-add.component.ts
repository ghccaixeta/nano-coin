import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Administrador } from '../model/administrador';
import { AdministradorService } from '../service/administrador.service';

declare var $:any

@Component({
  selector: 'app-administrador-add',
  templateUrl: './administrador-add.component.html',
  styleUrls: ['./administrador-add.component.css']
})
export class AdministradorAddComponent implements OnInit {

  administrador: Administrador;
  errors?: String[];
  

  show = false;
  isEmpty?: boolean;
  pSuccess?: boolean;
  administradorName?: String;
  administradorId?: Number

  btnDisabled?: boolean;
  saveSpinner?: boolean;
  saveNewSpinner?: boolean;

  constructor(
    private service: AdministradorService,
    private authService: AuthService,
    private router: Router,
  ) { 
    this.administrador = new Administrador;
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
    this.isEmpty = Object.values(this.administrador).every(value => {
      if (!value) {
        return true;
      }
      this.btnDisabled = true;
      return false;
    });

    if (!this.isEmpty){
      this.pSuccess = false;
      type == 'save' ? this.saveSpinner = true : this.saveNewSpinner = true;
      this.service
      .save(this.administrador)
      .subscribe({
        next: (v) => {
          if(type == 'save'){
            this.saveSpinner = false;
            this.router.navigate([`/administrador/${v.id}`],{ state: { ce: 'post' } })
          }else{
            this.btnDisabled = false;
            this.saveNewSpinner = false
            this.pSuccess = true;
            this.administradorName = this.administrador.nome_completo;
            this.administradorId = v.id;
            this.administrador = new Administrador;
            
            
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
      this.pSuccess = false;
      this.errors = ["Preencha os campos obrigatórios."]
    }
      
    
    
  }

}
