import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url = 'api/todos';

  constructor(private http: HttpClient) { }

  get(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url).pipe(
      tap(r => this.log('get', r))
    );
  }

  add(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.url, todo).pipe(
      tap(r => this.log('add', r))
    );
  }

  upd(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.url}/${todo.id}`, todo).pipe(
      tap(r => this.log('upd', r))
    );
  }

  del(todo: Todo): Observable<object> {
    return this.http.delete(`${this.url}/${todo.id}`).pipe(
      tap(r => this.log('del', r))
    );
  }

  private log(operation: string, result: any) {
    console.group(`TodoService::${operation}`);
    console.log(result);
    console.groupEnd();
  }
}
