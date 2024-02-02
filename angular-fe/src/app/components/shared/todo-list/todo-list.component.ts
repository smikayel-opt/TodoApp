import { Component } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { TodoCounterComponent } from '../todo-counter/todo-counter.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IToDo, TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoComponent, TodoCounterComponent, FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos: IToDo[] = []
  newToDo: string = ''

  constructor(public todoService: TodoService) { }

  ngOnInit() {
    this.getTodos()
  }

  /**
   * will retrive all todos from the backend
   */
  getTodos(): void {
    this.todoService.getAllTodos().subscribe((todos: IToDo[]) => {
      this.todos = todos
    })
  }

  /**
   * will create the todo 
   * @param newToDo new Todo content 
   * @returns 
   */
  addTodo(newToDo: string): void {
    if (!this.newToDo.trim()) return

    const todo = { content: newToDo, completed: false }
    this.todoService.addTodo(todo).subscribe((todo: IToDo) => {
      this.todos.push(todo);
    })

    this.newToDo = ''
  }

  /**
   * will delete todo from the list
   * @param todoToRemove todo object which should be removed
   * @returns 
   */
  removeTodo(todoToRemove: IToDo) {
    if (!todoToRemove.id) return
    this.todoService.removeTodo(todoToRemove.id).subscribe(() => {
      this.todos = this.todos.filter(todo => todo !== todoToRemove);
    })
  }

  /**
   * will count the uncompleted todos count
   * @returns number: todos count
   */
  unComplatedCount() {
    return this.todos.filter(todo => !todo.completed).length;
  }
}
