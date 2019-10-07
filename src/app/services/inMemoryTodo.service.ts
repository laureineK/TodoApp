import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ITodo } from '../models/ITodo';

export class InMemTodoService implements InMemoryDbService {
  createDb() {
    const todos: ITodo[] = [
      { id: 1, name: 'Call Eva', isDone: true, description: 'She must finish my tasks', createdAt: new Date() },
      { id: 2, name: 'Plan holidays', isDone: false, description: 'Travel to africa', createdAt: new Date() },
      { id: 3, name: 'Finish my code', isDone: false, description: 'Read documentation', createdAt: new Date() },
      { id: 4, name: 'Shopping', isDone: false, description: 'Buy cloth for childrens', createdAt: new Date() },
    ];
    return { todos };
  }
}
