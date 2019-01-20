import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  list: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.get().subscribe(todos => this.list = todos);
  }

  clickDel(todo: Todo) {
    this.todoService.del(todo).subscribe(
      r => this.list = this.list.filter(t => t.id !== todo.id)
    );
  }

  clickUpd(todo: Todo) {
    this.todoService.upd(todo).subscribe(
      r => {
        console.log(r);
      }
    );
  }

}
