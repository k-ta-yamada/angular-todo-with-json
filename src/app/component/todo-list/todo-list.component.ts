import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() list: Todo[];

  @Output() clickUpd = new EventEmitter<Todo>();

  @Output() clickDel = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  upd(todo: Todo) {
    this.clickUpd.emit(todo);
  }

  del(todo: Todo) {
    this.clickDel.emit(todo);
  }

  style(todo: Todo) {
    return todo.done ? 'done' : '';
  }

}
