import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input() todo: Todo = new Todo('');

  @Output() clickAdd = new EventEmitter<Todo>();

  @ViewChild('task') taskField: ElementRef;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.focus();
  }

  add() {
    if (!this.todo.task.trim()) {
      alert(`task is empty!!`);
      return;
    }

    this.todoService.addTodo(this.todo).subscribe(
      r => {
        this.todo = new Todo('');
        this.clickAdd.emit(r);
        this.focus();

      });
  }

  private focus() {
    (this.taskField.nativeElement as HTMLInputElement).focus();
  }
}
