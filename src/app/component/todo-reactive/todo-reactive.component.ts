import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-reactive',
  templateUrl: './todo-reactive.component.html',
  styleUrls: ['./todo-reactive.component.scss']
})
export class TodoReactiveComponent implements OnInit {

  @Output() clickAdd = new EventEmitter<Todo>();

  todoForm = new FormGroup({
    task: new FormControl(''),
    done: new FormControl(false),
  });

  constructor() { }

  ngOnInit() {
  }

  add() {
    this.clickAdd.emit(this.todoForm.value);
    this.todoForm.patchValue(new Todo);
  }

}
