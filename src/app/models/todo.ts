export class Todo {
  id = 0;
  task = '';
  done = false;

  constructor(todo = {task: '', done: false}) {
    this.task = todo.task;
    this.done = todo.done;
  }
}
