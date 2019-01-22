import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { TodoInputComponent } from './component/todo-input/todo-input.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoPageComponent,
    TodoListComponent,
    TodoInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
