import {Action, ActionReducerMap, createReducer, createSelector, on} from '@ngrx/store';
import { ITodo } from '../models/ITodo';
import * as TodoActions from './../actions/todo.actions';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {RouterStateUrl} from '../custom_route_serializer';

export interface TodoState {
  isLoaded: boolean;
  isFetching: boolean;
  todos: ITodo[];
}

export interface IState {
  todoState: TodoState;
  routerReducer: RouterReducerState<RouterStateUrl>;
}

export const initialState: TodoState = {
  isLoaded: false,
  isFetching: false,
  todos: [],
};

const todoReducer = createReducer(
  initialState,
  on(TodoActions.fetch, state => ({ ...state, isFetching: true, isLoaded: true })),
  on(TodoActions.receive, (state, action) => ({ ...state, isFetching: false, todos: [...action.todos] })),
  on(TodoActions.updated, (state, action) => ({
    ...state, todos: [...state.todos.map(todo => {
      if (todo.id === action.todo.id) {
        return {
          ...action.todo
        };
      }
      return todo;
    })]
  })),
);

export function reducer(state: TodoState, action: Action) {
  return todoReducer(state, action);
}

// CREATION DES SELECTORS
export const selectState = (state: IState) => state;

export const selectTodoState = createSelector(
    selectState,
    (state: IState) => state.todoState
);

export const selectAllTodos = createSelector(
    selectTodoState,
    (state: TodoState) => state.todos
);

export const selectDoneTodoList = createSelector(
    selectAllTodos,
    (todos: ITodo[]) => todos.filter(todo => todo.isDone)
);

export const selectUndoneTodoList = createSelector(
    selectAllTodos,
    (todos: ITodo[]) => todos.filter(todo => !todo.isDone)
);

export const selectTodo = createSelector(
    selectAllTodos,
    (todos: ITodo[], todoId: number) => todos.find(todo => todo.id === todoId)
);

export const selectIsAlreadyLoaded = createSelector(
    selectTodoState,
    (state: TodoState) => state.isLoaded
);

export const selectIsFetching = createSelector(
    selectTodoState,
    (state: TodoState) => state.isFetching
);

export const appReducers: ActionReducerMap<IState, any> = {
  todoState: todoReducer,
  routerReducer
};
