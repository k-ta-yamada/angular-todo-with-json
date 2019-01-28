import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  todo = new Todo;

  todoForm = this.fb.group({
    task: [this.todo.task, [Validators.required]],
    done: [this.todo.done, []],
    dummy: this.fb.group({
      dummy1: ['', []],
      dummy2: ['', []],
    }),
    dummyArray: this.fb.array([
      this.fb.control('array1'),
      this.fb.control('array2'),
    ]),
  });

  @Output() clickAdd = new EventEmitter<Todo>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() { }

  onSubmit() {
    // this.todo.task = this.todoForm.get('task').value;
    // this.todo.done = this.todoForm.get('done').value;

    this.todo = new Todo(this.todoForm.value);
    console.log(this.todo);

    this.clickAdd.emit(this.todo);

    this.todoForm.patchValue(new Todo);
    // this.todoForm.reset();
  }

}
