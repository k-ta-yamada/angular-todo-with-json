import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-listed',
  templateUrl: './todo-listed.component.html',
  styleUrls: ['./todo-listed.component.scss']
})
export class TodoListedComponent implements OnInit {

  @Input() todos: Todo[];

  @Output() clickDelete = new EventEmitter<Todo>();

  @ViewChild('taskForm') form: FormControl;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  toggleDone(todo: Todo) {
    todo.done = !todo.done;
    this.update(todo);
  }

  delete(todo: Todo) {
    this.todoService.delete(todo).subscribe(
      t => this.clickDelete.emit(t)
    );
  }

  update(todo: Todo) {
    this.todoService.update(todo).subscribe();
  }
}
