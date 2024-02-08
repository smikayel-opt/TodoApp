import { NgModule } from '@angular/core';
import { TodoListComponent } from '@app/components/shared/todo-list/todo-list.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent,],
  imports: [
    TodoListComponent,
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
