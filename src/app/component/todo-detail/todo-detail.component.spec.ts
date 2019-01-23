import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailComponent } from './todo-detail.component';
import { FormsModule } from '@angular/forms';
import { Todo } from 'src/app/models/todo';
import { EventEmitter } from '@angular/core';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoDetailComponent],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  describe('template:text', () => {
    let text: HTMLInputElement;
    beforeEach(() => {
      text = fixture.nativeElement.querySelector('input[type="text"]');
    });

    it('attirubtes', () => {
      // attributes
      expect(text.autofocus).toBeTruthy();
      expect(text.placeholder).toBe('add todo');
    });

    it('binding', () => {
      // input text binding todo property
      expect(component.todo.task).toBeUndefined();
      text.value = 'new todo';
      text.dispatchEvent(new Event('input'));
      expect(component.todo.task).toBe('new todo');
    });
  });

  describe('template:checkbox', () => {
    let checkbox: HTMLInputElement;
    beforeEach(() => {
      checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
    });

    it('binding', () => {
      // input text binding todo property
      expect(component.todo.done).toBeUndefined();
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change'));
      expect(component.todo.done).toBeTruthy();
    });
  });

  describe('template:button', () => {
    let button: HTMLButtonElement;
    beforeEach(() => {
      button = fixture.nativeElement.querySelector('button');
    });

    it('attirubtes', () => {
      // attributes
      expect(button.textContent).toBe('add');
    });

    it('event', () => {
      spyOn(component, 'add');
      button.click();
      expect(component.add).toHaveBeenCalled();
    });
  });

  it('#clickAdd', () => {
    const todo = { id: 1, task: 'new todo', done: false };
    component.todo = todo;

    component.clickAdd.subscribe(
      t => expect(t).not.toBe(todo)
    );
  });

  it('#add', () => {
    const todo = { id: 1, task: 'new todo', done: false };
    component.todo = todo;

    component.add();
    expect(component.todo.id).toBeUndefined();
    expect(component.todo.task).toBeUndefined();
    expect(component.todo.done).toBeUndefined();
  });
});
