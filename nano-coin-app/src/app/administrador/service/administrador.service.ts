import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Administrador } from '../model/administrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  apiUrl: string = environment.apiUrl;


  constructor(private http: HttpClient) { }

  count(nome_completo?:string, data_inicial?: string, data_final?: string) : Observable<number>{
    let httpParams = new HttpParams();

    if(nome_completo){
      httpParams = httpParams.set('nome_completo', nome_completo)
    }

    if(data_inicial && data_final){
      httpParams = httpParams.set('data_inicial', data_inicial).set('data_final',data_final)
    }

    return this.http.get<number>(`${this.apiUrl}/administrador/count?` + httpParams);
  }

  get(page: string, items: string, nome?: string, dataInicial?: string, dataFinal?: string) : Observable<Administrador[]>{
    
    let httpParams = new HttpParams();

    httpParams = httpParams.set("page", page).set("items", items)

    if(nome){
      
      httpParams = httpParams.set('nome_completo', nome)
    }

    if(dataInicial && dataFinal){
      httpParams = httpParams.set('data_inicial', dataInicial).set('data_final', dataFinal)
    }
    
    

    return this.http.get<Administrador[]>(`${this.apiUrl}/administrador?` + httpParams);
  }

 

  save(administrador: Administrador) : Observable<Administrador>{
    
    return this.http.post<Administrador>(`${this.apiUrl}/administrador/add`, administrador);
  }
  getById(id: number): Observable<Administrador>{
    
    return this.http.get<any>(`${this.apiUrl}/administrador/${id}`);
  }

  delete(administrador: Administrador): Observable<Administrador>{
    return this.http.delete<any>(`${this.apiUrl}/administrador/destroy/${administrador.id}`);
  }

  update(administrador: Administrador) : Observable<any>{
    return this.http.put<Administrador>(`${this.apiUrl}/administrador/edit/${administrador.id}`, administrador);
  }
  
}
