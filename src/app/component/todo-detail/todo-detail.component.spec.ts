import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailComponent } from './todo-detail.component';
import { Todo } from 'src/app/models/todo';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoDetailComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });

  describe('template', () => {
    let debugEl: DebugElement;
    let el: HTMLInputElement;

    describe('task', () => {
      beforeEach(() => {
        debugEl = fixture.debugElement.query(By.css('input[type="text"]'));
        el = debugEl.nativeElement;
      });

      it('attribute', () => {
        expect(el.autofocus).toBeTruthy();
        expect(el.placeholder).toBe('add todo');
      });

      it('binding to Todo\'s property', () => {
        el.value = 'task';
        el.dispatchEvent(new Event('input'));
        expect(component.todo.task).toBe('task');
      });

      describe('event', () => {
        beforeEach(() => {
          spyOn(component, 'handleKeyDown');
          spyOn(component, 'handleKeyUp');
        });

        it('keydown: handleKeyDown()がKeyboardEventを引数に呼ばれること', () => {
          // MEMO: とりあえずKeyboardEventとするがEventでも動く
          el.dispatchEvent(new Event('keydown'));
          expect(component.handleKeyDown).toHaveBeenCalledWith(new Event('dummy'));
        });

        it('keyup.enter: handleKeyUp()がKeyboardEventを引数に呼ばれること', () => {
          // MEMO: dispatchEventではkeyup.enterが呼べないし
          //       かといってkeyupではhandleKeyUpが呼ばれない
          //       よってtriggerEventHandlerを使用する
          // el.dispatchEvent(new KeyboardEvent('keyup.enter'));
          debugEl.triggerEventHandler('keyup.enter', new KeyboardEvent(''));
          expect(component.handleKeyUp).toHaveBeenCalledWith(new KeyboardEvent(''));
        });
      });
    });

    describe('done', () => {
      beforeEach(() => {
        debugEl = fixture.debugElement.query(By.css('input[type="checkbox"]'));
        el = debugEl.nativeElement;
      });

      it('binding to Todo\'s property', () => {
        el.checked = true;
        el.dispatchEvent(new Event('change'));
        expect(component.todo.done).toBeTruthy();
      });
    });

    describe('button', () => {
      beforeEach(() => {
        debugEl = fixture.debugElement.query(By.css('button'));
        el = debugEl.nativeElement;
      });

      it('attribute', () => {
        expect(el.textContent).toBe('add');
      });

      describe('event', () => {
        it('click: 引数なしでadd()が呼ばれること', () => {
          spyOn(component, 'add');
          el.click();
          expect(component.add).toHaveBeenCalledWith();
        });
      });
    });
  });

  describe('component', () => {
    it('#clikckAdd: component.todoがemitされること', () => {
      const result = new Todo;
      result.id = 42;
      result.task = 'new todo';
      result.done = true;
      component.todo = result;

      component.clickAdd.subscribe(r => expect(r).toBe(result));

      component.add();
    });

    it('#handleKeyDown: keyDownCodeに値が設定されること', () => {
      const debugElement = fixture.debugElement.query(By.css('input[type="text"]'));
      const which = 13;
      spyOn(component, 'handleKeyDown').and.callThrough();

      // MEMO: KeyboardEventのwhichの値が設定されることをテストしたいが
      //       KeyboardEventはwhichが設定できないためtriggerEventHandler()を使用
      // component.handleKeyDown(new KeyboardEvent('keydown', { which }));
      debugElement.triggerEventHandler('keydown', { which });

      expect(component.handleKeyDown).toHaveBeenCalled();
      expect(component.keyDownCode).toBe(which);
    });

    describe('#handleKeyUp', () => {
      it('keyDownCode = 13の場合: add()が呼ばれること', () => {
        const debugElement = fixture.debugElement.query(By.css('input[type="text"]'));
        const which = 13;
        spyOn(component, 'handleKeyUp').and.callThrough();
        spyOn(component, 'add');

        component.keyDownCode = which;
        // MEMO: KeyboardEventのwhichの値が設定されることをテストしたいが
        //       KeyboardEventはwhichが設定できないためtriggerEventHandler()を使用
        // component.handleKeyDown(new KeyboardEvent('keydown', { which }));
        debugElement.triggerEventHandler('keyup.enter', { which });

        expect(component.handleKeyUp).toHaveBeenCalled();
        expect(component.add).toHaveBeenCalled();
      });

      it('keyDownCode = 13ではない場合: add()が呼ばれないこと', () => {
        const debugElement = fixture.debugElement.query(By.css('input[type="text"]'));
        const which = 13;
        spyOn(component, 'handleKeyUp').and.callThrough();
        spyOn(component, 'add');

        component.keyDownCode = 0;
        debugElement.triggerEventHandler('keyup.enter', { which });

        expect(component.handleKeyUp).toHaveBeenCalled();
        expect(component.add).not.toHaveBeenCalled();
      });
    });

    it('#add: clickAdd.emit()が呼ばれ、this.todoはnew Todoとなること', () => {
      spyOn(component.clickAdd, 'emit');
      const result = new Todo;
      result.id = 42;
      result.task = 'hello';
      result.done = true;
      component.todo = result;

      component.add();

      expect(component.clickAdd.emit).toHaveBeenCalledWith(result);
      expect(component.todo).toEqual(new Todo);
    });
  });
});
