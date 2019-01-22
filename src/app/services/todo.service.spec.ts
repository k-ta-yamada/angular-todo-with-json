import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TodoService } from './todo.service';
import { Todo } from '../models/todo';
import { HttpErrorResponse } from '@angular/common/http';

describe('TodoService', () => {
  let httpTestingController: HttpTestingController;
  let service: TodoService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(TodoService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('#get', () => {
    const result = [new Todo, new Todo];
    service.get().subscribe(
      r => expect(r).toBe(result),
      fail
    );

    const req = httpTestingController.expectOne(service.url);
    expect(req.request.method).toBe('GET');
    req.flush(result);
  });

  it('#get 404', () => {
    service.get().subscribe(
      fail,
      (e: HttpErrorResponse) => {
        expect(e.status).toEqual(404, 'status');
        expect(e.statusText).toBe('not found', 'message');
      }
    );

    const req = httpTestingController.expectOne(service.url);
    expect(req.request.method).toBe('GET');
    req.flush('error', { status: 404, statusText: 'not found' });
  });

  it('#add', () => {
    const todo: Todo = { id: 1, task: 'add todo', done: false };
    const result = todo;
    service.add(todo).subscribe(r => expect(r).toBe(result));

    const req = httpTestingController.expectOne(service.url);
    expect(req.request.method).toBe('POST');
    req.flush(result);
  });

  it('#upd', () => {
    const todo: Todo = { id: 2, task: 'upd todo', done: false };
    const result = todo;
    service.upd(todo).subscribe(r => expect(r).toBe(result));

    const req = httpTestingController.expectOne(`${service.url}/${todo.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(result);
  });

  it('#del', () => {
    const todo: Todo = { id: 3, task: 'del todo', done: false };
    const result = {};
    service.del(todo).subscribe(r => expect(r).toBe(result));

    const req = httpTestingController.expectOne(`${service.url}/${todo.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(result);
  });

});
