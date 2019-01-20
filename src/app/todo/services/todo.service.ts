import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url = 'api/todos';

  constructor(private http: HttpClient) { }

  get(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url);
  }

  del(todo: Todo): Observable<object> {
    return this.http.delete(`${this.url}/${todo.id}`);
  }

  add(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.url, todo);
  }

  upd(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.url}/${todo.id}`, todo);
  }
}
