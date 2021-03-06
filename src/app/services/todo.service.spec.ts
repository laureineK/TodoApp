import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ITodo } from '../models/ITodo';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;
  let request: TestRequest;

  const todoList: ITodo[] = [
    { id: 1, name: 'Call Eva', isDone: true, description: 'She must finish my tasks', createdAt: new Date() },
    { id: 2, name: 'Plan holidays', isDone: false, description: 'Travel to africa', createdAt: new Date() },
    { id: 3, name: 'Finish my code', isDone: false, description: 'Read documentation', createdAt: new Date() },
    { id: 4, name: 'Shopping', isDone: false, description: 'Buy cloth for childrens', createdAt: new Date() },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(TodoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch todo list', done => {
    // act
    service.list().subscribe(res => {
      // assert
      expect(res).toEqual(todoList);
      done();
    });

    request = httpMock.expectOne('/api/todos');
    request.flush(todoList);

    httpMock.verify();
  });

  it('should return updated todo', done => {
    // arrange
    const todo: ITodo = {
      ...todoList[0],
      isDone: !todoList[0].isDone,
    };
    // act
    const expected = {
      ...todoList[0],
      isDone: !todoList[0].isDone,
    };
    service.update(todo).subscribe(updatedTodo => {
      // assert
      expect(updatedTodo).toEqual(expected);
      done();
    });

    request = httpMock.expectOne(`/api/todos/${todo.id}`);
    request.flush(expected);

    httpMock.verify();
  });

  it('should return created todo', done => {
    // arrange
    const todo: Partial<ITodo> = {
      name: 'test',
      description: 'description',
    };
    // act
    const expected: ITodo = {
      id: 5,
      name: todo.name,
      description: todo.name,
      createdAt: new Date(),
      isDone: false,
    };
    service.create(todo).subscribe(createdTodo => {
      // assert
      expect(createdTodo).toEqual(expected);
      done();
    });
    request = httpMock.expectOne('/api/todos');
    request.flush(expected);

    httpMock.verify();
  });
});
