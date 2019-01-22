import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {

  todos: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.get().subscribe(r => this.todos = r);
  }

  clickUpd(todo: Todo) {
    this.todoService.upd(todo).subscribe();
  }

  clickDel(todo: Todo) {
    this.todoService.del(todo).subscribe();
  }

}