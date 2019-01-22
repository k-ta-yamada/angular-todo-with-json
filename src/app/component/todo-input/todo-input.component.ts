import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent implements OnInit {

  todo: Todo = new Todo;

  @Output() clickAdd = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  add() {
    this.clickAdd.emit(this.todo);
    this.todo = new Todo;
  }

}
