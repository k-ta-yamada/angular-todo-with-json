export class Todo {
  id = 0;
  task = '';
  done = false;

  constructor(todo?: Todo) {
    if (todo === undefined) { return; }
    this.task = todo.task;
    this.done = todo.done;
  }
}
