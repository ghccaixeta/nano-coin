import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Funcionario } from '../model/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  apiUrl: string = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getCountFuncionario(nome_completo?:string, data_inicial?: string, data_final?: string) : Observable<number>{
    let httpParams = new HttpParams();

    

    if(nome_completo){
      httpParams = httpParams.set('nome_completo', nome_completo)
    }

    if(data_inicial && data_final){
      httpParams = httpParams.set('data_inicial', data_inicial).set('data_final',data_final)
    }

    return this.http.get<number>(`${this.apiUrl}/funcionario/count?` + httpParams);
  }

  getFuncionario(page: string, items: string, nome?: string, dataInicial?: string, dataFinal?: string) : Observable<Funcionario[]>{
    
    // var httpParams = new HttpParams().set("page", page).set("items", items);

    let httpParams = new HttpParams();

    httpParams = httpParams.set("page", page).set("items", items)

    if(nome){
      
      httpParams = httpParams.set('nome_completo', nome)
    }

    if(dataInicial && dataFinal){
      httpParams = httpParams.set('data_inicial', dataInicial).set('data_final', dataFinal)
    }
    
    // console.log(httpParams)

    return this.http.get<Funcionario[]>(`${this.apiUrl}/funcionario?` + httpParams);
  }

 

  save(funcionario: Funcionario) : Observable<Funcionario>{
    
    return this.http.post<Funcionario>(`${this.apiUrl}/funcionario/add`, funcionario);
  }
  getFuncionarioById(id: number): Observable<Funcionario>{
    
    return this.http.get<any>(`${this.apiUrl}/funcionario/${id}`);
  }

  delete(funcionario: Funcionario): Observable<Funcionario>{
    return this.http.delete<any>(`${this.apiUrl}/funcionario/destroy/${funcionario.id}`);
  }

  update(funcionario: Funcionario) : Observable<any>{
    return this.http.put<Funcionario>(`${this.apiUrl}/funcionario/edit/${funcionario.id}`, funcionario);
  }
}
