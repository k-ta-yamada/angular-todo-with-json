import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url = 'api/todos';

  constructor(private http: HttpClient) { }

  get(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url);
  }

  add(todo: Todo) {
    return this.http.post<Todo>(this.url, todo);
  }

  upd(todo: Todo) {
    return this.http.put<Todo>(`${this.url}/${todo.id}`, todo);
  }

  del(todo: Todo) {
    return this.http.delete<Todo>(`${this.url}/${todo.id}`);
  }
}
