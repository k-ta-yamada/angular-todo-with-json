import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Todo } from '../models/todo';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let httpTestingController: HttpTestingController;
  let service: TodoService;
  const expectError = (status = 404, statusText = '') => {
    return (e: HttpErrorResponse) => {
      expect(e.status).toEqual(status, 'status');
      expect(e.statusText).toBe(statusText, 'statusText');
    };
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(TodoService);
  });

  afterEach(() => { httpTestingController.verify(); });

  it('should be created', () => { expect(service).toBeTruthy(); });

  describe('#get', () => {
    it('status 200', () => {
      const result: Todo[] = [new Todo, new Todo];
      service.get().subscribe(r => expect(r).toBe(result), fail);
      const req = httpTestingController.expectOne(service.url);
      expect(req.request.method).toBe('GET');
      req.flush(result);
    });

    it('status 404', () => {
      service.get().subscribe(fail, expectError(404, 'not found'));
      const req = httpTestingController.expectOne(service.url);
      expect(req.request.method).toBe('GET');
      req.flush('error', { status: 404, statusText: 'not found' });
    });
  });

  describe('#add', () => {
    let result: Todo;
    beforeEach(() => { result = { id: 42, task: 'new todo', done: true }; });

    it('status OK', () => {
      service.add(result).subscribe(r => expect(r).toBe(result), fail);
      const req = httpTestingController.expectOne(service.url);
      expect(req.request.method).toBe('POST');
      req.flush(result);
    });

    it('status NG', () => {
      service.add(result).subscribe(fail, expectError(404, 'not found'));
      const req = httpTestingController.expectOne(service.url);
      expect(req.request.method).toBe('POST');
      req.flush('error', { status: 404, statusText: 'not found' });
    });
  });

  describe('#upd', () => {
    let result: Todo;
    beforeEach(() => { result = { id: 42, task: 'new todo', done: true }; });

    it('status OK', () => {
      service.upd(result).subscribe(r => expect(r).toBe(result), fail);
      const req = httpTestingController.expectOne(`${service.url}/${result.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(result);
    });

    it('status NG', () => {
      service.upd(result).subscribe(fail, expectError(404, 'not found'));
      const req = httpTestingController.expectOne(`${service.url}/${result.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush('error', { status: 404, statusText: 'not found' });
    });
  });

  describe('#del', () => {
    let result: Todo;
    beforeEach(() => { result = { id: 42, task: 'new todo', done: true }; });

    it('status OK', () => {
      service.del(result).subscribe(r => expect(r).toBe(result), fail);
      const req = httpTestingController.expectOne(`${service.url}/${result.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(result);
    });

    it('status NG', () => {
      service.del(result).subscribe(fail, expectError(404, 'not found'));
      const req = httpTestingController.expectOne(`${service.url}/${result.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush('error', { status: 404, statusText: 'not found' });
    });
  });

});
