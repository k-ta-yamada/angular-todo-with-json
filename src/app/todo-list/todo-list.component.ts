import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() todos: Todo[] = [];

  @Output() clickUpd = new EventEmitter<Todo>();

  @Output() clickDel = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  toggleDone(todo: Todo) {
    todo.done = !todo.done;
    console.log(todo)
    this.upd(todo);
  }

  upd(todo: Todo) {
    this.clickUpd.emit(todo);
  }

  del(todo: Todo) {
    this.clickDel.emit(todo);
  }
}
