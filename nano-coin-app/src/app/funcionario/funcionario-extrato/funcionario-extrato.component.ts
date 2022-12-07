import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movimentacao } from 'src/app/movimentacao/model/movimentacao';
import { MovimentacaoService } from 'src/app/movimentacao/service/movimentacao.service';


@Component({
  selector: 'app-funcionario-extrato',
  templateUrl: './funcionario-extrato.component.html',
  styleUrls: ['./funcionario-extrato.component.css']
})
export class FuncionarioExtratoComponent implements OnInit {

  id?: number;
  all: Movimentacao[] = []
  movimentacoes: any
  nome_completo?: string;
  saldo_atual!: number;

  constructor(
    private router: Router,
    private service: MovimentacaoService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let params = this.activatedRoute.params;
    params.subscribe(urlParams =>{
      this.id = Number(urlParams['id']) ;
      this.service.getmovimentacaoByFuncionarioId(this.id).subscribe({
        next:(v) =>{
          this.movimentacoes = v;
          this.all = this.movimentacoes;
          this.nome_completo = this.movimentacoes[0].Funcionario.nome_completo
          this.saldo_atual = parseFloat(this.movimentacoes[0].Funcionario.saldo_atual) 
        },
        error:(e)=> this.router.navigate(['/funcionario'])
      })
      // ((data: Movimentacao[]) => {
      //   this.movimentacoes = data;
      //   this.all = this.movimentacoes;
      //   this.nome_completo = this.movimentacoes[0].Funcionario.nome_completo
      //   this.saldo_atual = parseFloat(this.movimentacoes[0].Funcionario.saldo_atual) 
      // });
      
    })
  }

}
