import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from '../model/funcionario';
import { FuncionarioService } from '../service/funcionario.service';

declare var $:any

@Component({
  selector: 'app-funcionario-detail',
  templateUrl: './funcionario-detail.component.html',
  styleUrls: ['./funcionario-detail.component.css']
})
export class FuncionarioDetailComponent implements OnInit {

  funcionario: Funcionario;
  id?: number;
  crud?: String;
  error?: String;
  show = false;

  constructor(
    private router: Router,
    private service: FuncionarioService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.funcionario = new Funcionario;
  }

  ngOnInit(): void {

    $(".showtoast").click(function(){
      $('.toast').toast('show');
      })

    let params = this.activatedRoute.params;
    this.crud = history.state.ce
    params.subscribe(urlParams =>{
      this.id = Number(urlParams['id']) ;
      this.service.getFuncionarioById(this.id).subscribe({
        next:(r) => this.funcionario = r,
        error:()=>this.router.navigate([`/funcionario`]),
      })
    })
  }

  delete(){
    this.error = ""
    this.service.delete(this.funcionario).subscribe({
      complete:()=>{
        this.router.navigate([`/funcionario`],{ state: { successDelete: true, contryName: this.funcionario.nome_completo } })
      },
      error:(e)=> {
        this.error = e.error.message
        
        
      },
    })
  }

}
