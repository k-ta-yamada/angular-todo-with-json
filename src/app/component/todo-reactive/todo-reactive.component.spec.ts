import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoReactiveComponent } from './todo-reactive.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Todo } from 'src/app/models/todo';

fdescribe('TodoReactiveComponent', () => {
  let component: TodoReactiveComponent;
  let fixture: ComponentFixture<TodoReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoReactiveComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    expect(component.todoForm.get('task').value).toBe('');
    expect(component.todoForm.get('done').value).toBeFalsy();
  });

  describe('#add', () => {

    it('task入力時はemitされ、リセットされること', () => {
      const result = {
        task: 'new todo',
        done: true,
      };

      component.clickAdd.subscribe((r: Todo) => {
        expect(r).toEqual(result);
        // expect(r instanceof Todo).toBeTruthy('instanceof Todo');
      });

      component.todoForm.patchValue(result);
      component.add();

      expect(component.todoForm.value).toEqual({ task: '', done: false });
    });

    it('task未入力時はemitされず、リセットもされないこと', () => {
      spyOn(component.clickAdd, 'emit');
      spyOn(component.todoForm, 'patchValue');

      component.add();

      expect(component.clickAdd.emit).not.toHaveBeenCalled();
      expect(component.todoForm.patchValue).not.toHaveBeenCalled();
    });
  });

});
