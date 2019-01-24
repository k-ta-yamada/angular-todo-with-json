import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TodoService } from './todo.service';
import { Todo } from '../models/todo';

describe('TodoService', () => {
  let httpTestingController: HttpTestingController;
  let todoService: TodoService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    todoService = TestBed.get(TodoService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(todoService).toBeTruthy();
  });

  it('#get', () => {
    const todos: Todo[] = [];

    todoService.get().subscribe(
      result => { expect(result).toBe(todos); },
      fail
    );

    const req = httpTestingController.expectOne(todoService.url);
    expect(req.request.method).toBe('GET');
    req.flush(todos);
  });

  it('#add', () => {
    const todo: Todo = { id: 42, task: 'new todo', done: false };

    todoService.add(todo).subscribe(
      result => { expect(result).toBe(todo); },
      fail
    );

    const req = httpTestingController.expectOne(todoService.url);
    expect(req.request.method).toBe('POST');
    req.flush(todo);
  });

  it('#upd', () => {
    const todo: Todo = { id: 42, task: 'new todo', done: false };

    todoService.upd(todo).subscribe(
      result => { expect(result).toBe(todo); },
      fail
    );

    const req = httpTestingController.expectOne(`${todoService.url}/${todo.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(todo);
  });

  it('#del', () => {
    const todo: Todo = { id: 42, task: 'new todo', done: false };
    const body = {};

    todoService.del(todo).subscribe(
      result => { expect(result).toBe(body); },
      fail
    );

    const req = httpTestingController.expectOne(`${todoService.url}/${todo.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(body);
  });
});
