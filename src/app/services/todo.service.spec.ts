import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Todo } from '../models/todo';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService],
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(TodoService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  const result: Todo[] = [
    { id: 1, task: 'aaa', done: false },
    { id: 2, task: 'aaa', done: false },
    { id: 3, task: 'aaa', done: false },
  ];

  it('#get', () => {
    service.get()
      .subscribe(
        r => expect(r).toEqual(result),
        fail
      );

    const req = httpTestingController.expectOne(service.url);
    expect(req.request.method).toEqual('GET');
    req.flush(result);
  });

  it('#add', () => {
    const todo: Todo = { id: 1, task: 'add task', done: false };
    service.add(todo).subscribe(
      r => {
        console.group('#add.subscribe');
        console.log('ADDED!!!!');
        console.log(r);
        console.groupEnd();
        expect(r).toEqual(todo);
      },
      fail
    );

    const req = httpTestingController.expectOne(service.url);
    expect(req.request.method).toEqual('POST');
    req.flush(todo);
  });
});
