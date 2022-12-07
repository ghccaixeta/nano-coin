import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../model/funcionario';
import { FuncionarioService } from '../service/funcionario.service';

class Filtro {

  nome_completo!: string;
  data_inicial!: string;
  data_final!: string

}

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.css']
})
export class FuncionarioListComponent implements OnInit {


  isLoadging = true;
  collectionSize!: number;
  allfuncionarios: Funcionario[] = []
  funcionarios: any
  page = 1;
  pageSize = 10;
  successDelete?: boolean;
  funcionarioDeleteName?: String;

  filtro = new Filtro;

  nomeFuncionario?: string
  dataInicial?: string
  dataFinal?: string



  constructor(private service: FuncionarioService) { 
    this.successDelete = history.state.successDelete
    this.funcionarioDeleteName = history.state.cityName
    this.paginate(this.page, this.pageSize);
  }

  ngOnInit(): void {
  }

  getfuncionarios(page: number){
    this.page = page;
    this.isLoadging = true;
    this.paginate(page, this.pageSize);
  }

  paginate(page: number = 1, items: number = this.pageSize){
    this.service.getCountFuncionario(this.filtro.nome_completo, this.filtro.data_inicial, this.filtro.data_final).subscribe({
      next: (v)=>{
        this.isLoadging = false;
        this.collectionSize = v;
        this.service.getFuncionario(page.toString(), items.toString(), this.filtro.nome_completo, this.filtro.data_inicial, this.filtro.data_final).subscribe((data: Funcionario[]) => {
          this.funcionarios = data;
          this.allfuncionarios = this.funcionarios;
        });
        
      }
    })
  }

  limparFiltro(){
    
    this.filtro = new Filtro
    this.paginate()
  }
}
