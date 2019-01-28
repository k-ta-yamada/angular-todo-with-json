import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo-reactive',
  templateUrl: './todo-reactive.component.html',
  styleUrls: ['./todo-reactive.component.scss']
})
export class TodoReactiveComponent implements OnInit {

  @Output() clickAdd = new EventEmitter<Todo>();

  todoForm = this.fb.group({
    task: [''],
    done: [false],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  add() {
    this.clickAdd.emit(this.todoForm.value);
    this.todoForm.patchValue(new Todo);
  }

}
