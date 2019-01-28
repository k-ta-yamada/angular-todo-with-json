import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoReactiveComponent } from './todo-reactive.component';

describe('TodoReactiveComponent', () => {
  let component: TodoReactiveComponent;
  let fixture: ComponentFixture<TodoReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoReactiveComponent ]
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
  });
});
