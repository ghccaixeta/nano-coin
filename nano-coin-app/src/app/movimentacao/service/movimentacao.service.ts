import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movimentacao } from '../model/movimentacao';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  apiUrl: string = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getCountmovimentacao(nome_completo?:string, data_inicial?: string, data_final?: string, tipo_movimentacao?: string) : Observable<number>{
    let httpParams = new HttpParams();

    

    if(nome_completo){
      httpParams = httpParams.set('nome_completo', nome_completo)
    }

    if(tipo_movimentacao){
      httpParams = httpParams.set('tipo_movimentacao', tipo_movimentacao)
    }

    if(data_inicial && data_final){
      httpParams = httpParams.set('data_inicial', data_inicial).set('data_final',data_final)
    }
    return this.http.get<number>(`${this.apiUrl}/movimentacao/count?` + httpParams);
  }

  getmovimentacao(page: string, items: string, nome?: string, tipo_movimentacao?: string, dataInicial?: string, dataFinal?: string) : Observable<Movimentacao[]>{
    
    // var httpParams = new HttpParams().set("page", page).set("items", items);

    let httpParams = new HttpParams();

    httpParams = httpParams.set("page", page).set("items", items)

    if(nome){
      
      httpParams = httpParams.set('nome_completo', nome)
    }

    if(tipo_movimentacao){
      
      httpParams = httpParams.set('tipo_movimentacao', tipo_movimentacao)
    }

    if(dataInicial && dataFinal){
      httpParams = httpParams.set('data_inicial', dataInicial).set('data_final', dataFinal)
    }
    
    return this.http.get<Movimentacao[]>(`${this.apiUrl}/movimentacao?` + httpParams);
  }

  save(movimentacao: Movimentacao) : Observable<Movimentacao>{
    
    return this.http.post<Movimentacao>(`${this.apiUrl}/movimentacao/add`, movimentacao);
  }
  getmovimentacaoById(id: number): Observable<Movimentacao>{
    
    return this.http.get<any>(`${this.apiUrl}/movimentacao/${id}`);
  }

  getmovimentacaoByFuncionarioId(id: number): Observable<Movimentacao[]>{
    
    return this.http.get<Movimentacao[]>(`${this.apiUrl}/movimentacao/funcionario/${id}`);
  }

  delete(movimentacao: Movimentacao): Observable<Movimentacao>{
    return this.http.delete<any>(`${this.apiUrl}/movimentacao/destroy/${movimentacao.id}`);
  }

  update(movimentacao: Movimentacao) : Observable<any>{
    return this.http.put<Movimentacao>(`${this.apiUrl}/movimentacao/edit/${movimentacao.id}`, movimentacao);
  }
  
}
