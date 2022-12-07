import { Component, OnInit } from '@angular/core';
import { Filtro } from '../model/filtro';
import { Movimentacao } from '../model/movimentacao';
import { MovimentacaoService } from '../service/movimentacao.service';

@Component({
  selector: 'app-movimentacao-list',
  templateUrl: './movimentacao-list.component.html',
  styleUrls: ['./movimentacao-list.component.css']
})
export class MovimentacaoListComponent implements OnInit {

  isLoadging = true;
  collectionSize!: number;
  movimentacoes: Movimentacao[] = []
  page = 1;
  pageSize = 10;
  filtro: Filtro;

  



  constructor(private service: MovimentacaoService) { 
    
    this.filtro = new Filtro
    this.paginate(this.page, this.pageSize);
  }

  ngOnInit(): void {
  }

  getMovimentacoes(page: number){
    this.page = page;
    this.isLoadging = true;
    this.paginate(page, this.pageSize);
  }

  paginate(page: number = 1, items: number = this.pageSize){
    this.service.getCountmovimentacao(this.filtro.nome_completo, this.filtro.data_inicial, this.filtro.data_final, this.filtro.tipo_movimentacao).subscribe({
      next: (v)=>{
        this.isLoadging = false;
        this.collectionSize = v;
        this.service.getmovimentacao(page.toString(), items.toString(), this.filtro.nome_completo, this.filtro.tipo_movimentacao, this.filtro.data_inicial, this.filtro.data_final).subscribe((data: Movimentacao[]) => {
          this.movimentacoes = data;
          
        });
        
      }
    })
  }

  limparFiltro(){
    
    this.filtro = new Filtro
    this.paginate()
  }

}
