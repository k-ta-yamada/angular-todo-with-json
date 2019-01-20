import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {

  todos: Todo[] = [];

  todo: Todo = new Todo;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.get().subscribe(r => this.todos = r);
  }

  clickAdd(todo: Todo) {
    console.log(todo);
    this.todoService.add(todo)
      .subscribe(r => {
        this.todos.push(r);
        this.todo = new Todo;
      });
  }

  clickUpd(todo: Todo) {
    this.todoService.upd(todo).subscribe();
  }

  clickDel(todo: Todo) {
    this.todoService.del(todo).subscribe(
      _ => this.todos = this.todos.filter(t => t.id !== todo.id)
    );
  }
}
