import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url = 'api/todos';

  constructor(private http: HttpClient) { }

  get(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url).pipe(
      tap(r => this.log('get', r)),
      catchError(this.handleError)
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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

}
