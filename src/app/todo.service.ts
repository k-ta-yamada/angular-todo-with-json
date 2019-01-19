import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private URL = '/api/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.URL).pipe(
      tap(r => {
        console.group(`TodoService::getTodos`);
        console.log(r);
        console.groupEnd();
      }),
      catchError(
        this.handleError<Todo[]>('getTodos', [])
      )
    );
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.URL, todo).pipe(
      tap(this.tapNext('addTodo')),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }

  toggleDone(todo: Todo) {
    todo.done = !todo.done;
    return this.http.put<Todo>(`${this.URL}/${todo.id}`, todo).pipe(
      tap(this.tapNext('toggleDone'))
    );
  }

  delete(todo: Todo) {
    return this.http.delete<Todo>(`${this.URL}/${todo.id}`).pipe(
      // DELETEのresponseが空なので、todoを返しておく
      map(r => {
        console.group(`TodoService::delete`);
        console.log(r);
        console.groupEnd();
        return todo;
      })
    );
  }

  update(todo: Todo) {
    return this.http.put<Todo>(`${this.URL}/${todo.id}`, todo).pipe(
      tap(this.tapNext('update'))
    );
  }

  private tapNext(method: string) {
    return (result) => {
      console.group(`TodoService::${method}`);
      console.log(result);
      console.groupEnd();
    };
  }

  private handleError<T>(operation: string, r?: T) {
    return (error): Observable<T> => {
      console.group(`TodoService::handleError::${operation}`);
      console.error(error);
      console.error(`operation=[${operation}]`);
      console.error(r);
      console.groupEnd();
      return of(r as T);
    };
  }
}
