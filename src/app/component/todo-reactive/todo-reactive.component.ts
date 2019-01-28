import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-reactive',
  templateUrl: './todo-reactive.component.html',
  styleUrls: ['./todo-reactive.component.scss']
})
export class TodoReactiveComponent implements OnInit {

  @Output() clickAdd = new EventEmitter<Todo>();

  constructor(private fb: FormBuilder) { }

  todoForm = this.fb.group({
    task: ['', [Validators.required]],
    done: [false, []],
  });

  get task() {
    return this.todoForm.get('task');
  }

  ngOnInit() { }

  handleSubmit(e: any) {
    if (this.todoForm.invalid) { return; }

    this.clickAdd.emit(new Todo(this.todoForm.value));
    this.todoForm.patchValue(new Todo);
  }

}
