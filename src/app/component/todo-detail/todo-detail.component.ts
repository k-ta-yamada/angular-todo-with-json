import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent {

  todo: Todo = new Todo;

  keyDownCode: number;

  @Output() clickAdd = new EventEmitter<Todo>();

  handleKeyDown(e: KeyboardEvent) {
    this.keyDownCode = e.which;
  }

  handleKeyUp(e: KeyboardEvent) {
    if (e.which !== this.keyDownCode) { return; }
    this.add();
  }

  add() {
    this.clickAdd.emit(this.todo);
    this.todo = new Todo;
  }

}
