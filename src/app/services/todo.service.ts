import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ITodo } from '../models/ITodo';
import { ITodoService } from './ITodo.service';

const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json' }) };

@Injectable({
  providedIn: 'root',
})
export class TodoService implements ITodoService {
  constructor(private httpClient: HttpClient) {}
  private static readonly url = '/api/todos';

  private static handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  public list(): Observable<ITodo[]> {
    return this.httpClient.get<ITodo[]>(TodoService.url).pipe(catchError(TodoService.handleError));
  }

  public update(todo: ITodo): Observable<ITodo> {
    const url = `${TodoService.url}/${todo.id}`;
    return this.httpClient.put<ITodo>(url, todo, options).pipe(
      map(() => todo),
      catchError(TodoService.handleError),
    );
  }

  public create(todo: Partial<ITodo>): Observable<ITodo> {
    todo.createdAt = new Date();
    return this.httpClient.post<ITodo>(TodoService.url, todo, options).pipe(catchError(TodoService.handleError));
  }
}
