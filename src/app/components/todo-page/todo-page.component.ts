import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITodo } from 'src/app/models/ITodo';
import * as TodoActions from './../../actions/todo.actions';
import {
  selectDoneTodoList,
  selectUndoneTodoList,
  selectIsFetching, IState
} from '../../reducers/todo.reducer';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent implements OnInit {
  undoneTodoList$: Observable<ITodo[]> = this.store.select(selectUndoneTodoList);
  doneTodoList$: Observable<ITodo[]> = this.store.select(selectDoneTodoList);
  isFetching: Observable<boolean> = this.store.select(selectIsFetching);
  constructor(private store: Store<IState>) {}

  ngOnInit() {
    this.store.dispatch(TodoActions.fetch());
  }

  public onTodoToggle(todo: ITodo) {
    this.store.dispatch(
      TodoActions.update({
        id: todo.id,
        todo,
      }),
    );
  }
}
