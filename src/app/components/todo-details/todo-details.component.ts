import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ITodo } from 'src/app/models/ITodo';
import { switchMap, tap } from 'rxjs/operators';

import * as TodoActions from './../../actions/todo.actions';
import { IState as TodoState, selectIsAlreadyLoaded, selectTodo } from './../../reducers/todo.reducer';
@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit {
  public Todo$: Observable<ITodo>;
  constructor(
    private route: ActivatedRoute,
    private store: Store<{ todo: TodoState }>
  ) { }

  ngOnInit() {
    this.Todo$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.loadDetails(Number(params.get('id')))));
  }

  private loadDetails(todoId: number) {
    return this.store.select((state) => selectIsAlreadyLoaded(state.todo))
      .pipe(
        tap(isLoaded => {
          if (!isLoaded) {
            return this.store.dispatch(TodoActions.fetch);
          }
          return EMPTY;
        }),
        switchMap(() => this.store.select((state) => selectTodo(state.todo, todoId))
        ));
  }

}
