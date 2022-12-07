import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrador } from '../model/administrador';
import { AdministradorService } from '../service/administrador.service';

declare var $:any

@Component({
  selector: 'app-administrador-detail',
  templateUrl: './administrador-detail.component.html',
  styleUrls: ['./administrador-detail.component.css']
})
export class AdministradorDetailComponent implements OnInit {

  administrador: Administrador;
  id?: number;
  crud?: String;
  error?: String;
  show = false;

  constructor(
    private router: Router,
    private service: AdministradorService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.administrador = new Administrador;
  }

  ngOnInit(): void {

    $(".showtoast").click(function(){
      $('.toast').toast('show');
      })

    let params = this.activatedRoute.params;
    this.crud = history.state.ce
    params.subscribe(urlParams =>{
      this.id = Number(urlParams['id']) ;
      this.service.getById(this.id).subscribe({
        next:(r) => this.administrador = r,
        error:()=>this.router.navigate([`/administrador`]),
      })
    })
  }

  delete(){
    this.error = ""
    this.service.delete(this.administrador).subscribe({
      complete:()=>{
        this.router.navigate([`/administrador`],{ state: { successDelete: true, contryName: this.administrador.nome_completo } })
      },
      error:(e)=> {
        this.error = e.error.message
        
        
      },
    })
  }

}
