import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input() todo: Todo;

  @Output() clickAdd = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  add() {
    this.clickAdd.emit(this.todo);
  }

}
