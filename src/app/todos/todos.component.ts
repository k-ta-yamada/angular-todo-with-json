import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  private _todos: Todo[] = [];

  constructor(protected todoService: TodoService) { }

  ngOnInit() {
    this.reload();
  }

  get todos() {
    return this._todos.sort((a, b) => a.done > b.done ? 1 : -1);
  }

  reload() {
    this.todoService.getTodos().subscribe(
      todos => this._todos = todos,
      err => console.log(err)
    );
  }

  handleClickAdd(todo: Todo) {
    this._todos.push(todo);
  }

  handleClickDelete(todo: Todo) {
    this._todos = this._todos.filter(t => t.id !== todo.id);
  }

}
