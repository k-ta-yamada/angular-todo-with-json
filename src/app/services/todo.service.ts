import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url = 'api/todos';

  constructor(private http: HttpClient) { }

  get(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url).pipe(
      tap(r => this.logging('get', r)),
    );
  }

  add(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.url, todo).pipe(
      tap(r => this.logging('add', r)),
    );
  }

  upd(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.url}/${todo.id}`, todo).pipe(
      tap(r => this.logging('upd', r)),
    );
  }

  del(todo: Todo): Observable<Todo> {
    return this.http.delete<Todo>(`${this.url}/${todo.id}`).pipe(
      tap(r => this.logging('del', r)),
      map(_ => todo)
    );
  }

  private logging(operation: string, r: any) {
    console.group(`TodoService:${operation}`);
    console.log(r);
    console.groupEnd();
  }
}
