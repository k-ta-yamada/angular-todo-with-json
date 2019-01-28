import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  todo: Todo = new Todo;

  keyDownCode: number;

  @Output() clickAdd = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  add(e: KeyboardEvent) {
    if (this.keyDownCode !== 13) { return; }

    this.clickAdd.emit(this.todo);
    this.todo = new Todo;
  }

}
