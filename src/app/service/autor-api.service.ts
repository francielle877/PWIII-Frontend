import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { throwError, Observable } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';
import { Editora } from '../editora';


@Injectable({
  providedIn: 'root'

})
export class AutorAPIService {
  apiURL: string = "http://localhost:8484/bibliotecadigital/editoras";
  constructor(private httpClient: HttpClient) { }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código de erro: ${error.status}\nMensagem: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getEditoras(): Observable<Editora[]> {
    return this.httpClient.get<Editora[]>(this.apiURL)
      .pipe(retry(1),
        catchError(this.handleError));
  }
  createEditora(aut: Editora): Observable<Editora> {
    return this.httpClient.post<Editora>(`${this.apiURL}`, aut)
    .pipe(retry(1),
    catchError(this.handleError));
    }
}
