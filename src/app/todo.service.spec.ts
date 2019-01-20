import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TodoService } from './todo.service';
import { serializePath } from '@angular/router/src/url_tree';
import { Todo } from './todo';

describe('TodoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  it('should be created', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
    expect(service.get()).toBeTruthy();
  });

  it('get', () => {
    const service: TodoService = TestBed.get(TodoService);
    console.log(1111111);
    service.get().subscribe(r => {
      expect(r).toBe([new Todo]);
    });
  });
});
