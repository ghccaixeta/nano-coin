import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Login } from './model/login';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  show = false;

  login: Login;

  isEmpty?: boolean;

  error?: boolean;
  isLoading?: boolean;
  messageError?: string;
  


  constructor(
    private router: Router,
    private authService: AuthService
  ) { 
    this.login = new Login;
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
              })
    
    
  }

  onSubmit(){
    this.error = false;
    this.validate();
    this.isEmpty = Object.values(this.login).every(value => {
      if (!value) {
        return true;
      }
      return false;
    });
    if(this.isEmpty){
      this.error = true;
      this.messageError = "Preencha todos os campos."
    }else{

      this.isLoading = true;
      this.authService.login(this.login).subscribe({
        next:(v)=>{
          
          this.error = false;
          this.isLoading = false;
          const accessToken = JSON.stringify(v)
          localStorage.setItem('access_token', accessToken)
          this.router.navigate(['/funcionario'])
  
        },
        error:(e)=>{
          this.error = true;
          this.isLoading = false;
          if(e.status == 400){
            this.messageError = "Usuário ou Senha incorretos."
          }else{
            this.messageError = "Não foi possível conectar ao servidor."
          }
  
        }
        
      })
    }
  }

}
