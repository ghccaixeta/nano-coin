import { Component, OnInit } from '@angular/core';
import { Administrador } from '../model/administrador';
import { Filtro } from '../model/filtro';
import { AdministradorService } from '../service/administrador.service';

@Component({
  selector: 'app-administrador-list',
  templateUrl: './administrador-list.component.html',
  styleUrls: ['./administrador-list.component.css']
})
export class AdministradorListComponent implements OnInit {

  isLoadging = true;
  collectionSize!: number;
  administradores: Administrador[] = []
  filtro: Filtro;
  page = 1;
  pageSize = 10;
  successDelete?: boolean;
  administradorDeleteName?: String;

  

  nomeadministrador?: string
  dataInicial?: string
  dataFinal?: string



  constructor(private service: AdministradorService) { 
    this.filtro = new Filtro
    this.successDelete = history.state.successDelete
    this.administradorDeleteName = history.state.cityName
    this.paginate(this.page, this.pageSize);
  }

  ngOnInit(): void {
  }

  get(page: number){
    this.page = page;
    this.isLoadging = true;
    this.paginate(page, this.pageSize);
  }

  paginate(page: number = 1, items: number = this.pageSize){
    this.service.count(this.filtro.nome_completo, this.filtro.data_inicial, this.filtro.data_final).subscribe({
      next: (v)=>{
        this.isLoadging = false;
        this.collectionSize = v;
        this.service.get(page.toString(), items.toString(), this.filtro.nome_completo, this.filtro.data_inicial, this.filtro.data_final).subscribe((data: Administrador[]) => {
          this.administradores = data;
          
        });
        
      }
    })
  }

  limparFiltro(){
    
    this.filtro = new Filtro
    this.paginate()
  }

}
