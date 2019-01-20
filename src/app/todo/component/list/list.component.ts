import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list: Todo[] = [];

  @Output() clickDel = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  del(todo: Todo) {
    this.clickDel.emit(todo);
  }

}
