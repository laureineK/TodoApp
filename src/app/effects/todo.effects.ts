import {Actions, createEffect, ofType} from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import * as TodoActions from './../actions/todo.actions';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { TodoService } from '../services/todo.service';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private snackbar: MatSnackBar
  ) { }
  fetchTodos$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.fetch),
      mergeMap(() => this.todoService.list()
        .pipe(
          map(todos => TodoActions.receive({ todos })),
          catchError(() => of(TodoActions.receive({ todos: [] }))
          ))
      )));

  createTodo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.create),
      mergeMap((action) => this.todoService.create(action.todo)
        .pipe(
          map(todo => TodoActions.created({ todo })),
          catchError(() => of(TodoActions.createFail()))
        ))
    ));

  updateTodo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.update),
      mergeMap((action) => this.todoService.update(action.todo)
        .pipe(
          map(todo => TodoActions.updated({ todo })),
          catchError(() => of(TodoActions.updateFail()))
        ))
    ));

  todoCreated$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.created),
      tap((action) => this.snackbar.open(`Todo "${action.todo.name}" created!`, 'dismiss', { duration: 3000 }))
    ), { dispatch: false });

  todoCreateFail$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.createFail),
      tap(() => this.snackbar.open(`Todo create fail, sorry...`, 'dismiss', { duration: 3000 }))
    ), { dispatch: false });
}
