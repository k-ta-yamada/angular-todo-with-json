import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { FormsModule } from '@angular/forms';
import { Todo } from 'src/app/models/todo';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('template', () => {
    let todoList: HTMLElement;

    beforeEach(() => {
      todoList = fixture.nativeElement;
      component.list = [
        { id: 1, task: 'todo1', done: false },
        { id: 2, task: 'todo2', done: true },
      ];
      fixture.detectChanges();
    });

    it('should behave...', () => {
      expect(todoList.querySelectorAll('div').length).toBe(2);

      component.list = [];
      fixture.detectChanges();
      expect(todoList.querySelectorAll('div').length).toBe(0);
    });
  });

  describe('template:list item', () => {
    let todoList: HTMLElement;
    let div: HTMLDivElement;

    beforeEach(() => {
      todoList = fixture.nativeElement;
      component.list = [{ id: 42, task: 'todo1', done: true }];
      fixture.detectChanges();
      div = todoList.querySelector('div');
    });

    it('id:label', () => {
      const label = div.querySelector('#id') as HTMLLabelElement;
      expect(label.textContent).toBe('042');
    });

    it('done:checkbox', () => {
      const checkbox = div.querySelector('#done') as HTMLInputElement;
      expect(checkbox).toBeTruthy();
    });

    it('task:text', () => {
      const text = div.querySelector('#task') as HTMLInputElement;
      expect(text).toBeTruthy();
      expect(text.classList).toContain('done');

      component.list[0].done = false;
      fixture.detectChanges();
      expect(text.classList).not.toContain('done');
    });
  });

  describe('event', () => {
    let checkbox: HTMLInputElement;
    let button: HTMLButtonElement;

    beforeEach(() => {
      const todoList = fixture.nativeElement;
      component.list = [{ id: 42, task: 'todo1', done: true }];
      fixture.detectChanges();
      const div = todoList.querySelector('div');
      checkbox = div.querySelector('#done');
      button = div.querySelector('button');

      spyOn(component, 'upd');
      spyOn(component, 'del');
    });

    it('done:checkbox', () => {
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event('change'));
      expect(component.upd).toHaveBeenCalled();
    });

    it('upd:button', () => {
      button.click();
      expect(component.del).toHaveBeenCalled();
    });
  });

  it('#clickUpd', () => {
    const todo = new Todo;
    component.clickUpd.subscribe(t => expect(t).toBe(todo));
    component.upd(todo);
  });

  it('#clickDel', () => {
    const todo = new Todo;
    component.clickDel.subscribe(t => expect(t).toBe(todo));
    component.del(todo);
  });

});
