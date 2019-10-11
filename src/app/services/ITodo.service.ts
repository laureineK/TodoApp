import { Observable } from 'rxjs';
import { ITodo } from '../models/ITodo';

export interface ITodoService {
  list(): Observable<ITodo[]>;
  update(todo: ITodo): Observable<ITodo>;
  create(todo: Partial<ITodo>): Observable<ITodo>;
}
