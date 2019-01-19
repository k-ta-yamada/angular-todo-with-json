export class Todo {
  id: number;
  task: string;
  done: boolean;

  constructor(task: string, done = false) {
    this.task = task;
    this.done = done;
  }
}
