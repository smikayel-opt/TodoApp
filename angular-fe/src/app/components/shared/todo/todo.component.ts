import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IToDo, TodoService } from '../../../services/todo.service';


@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  @Input() toDo?: IToDo;
  @Output() removeEvent = new EventEmitter();
  isEditable: boolean = false

  constructor(private todoService: TodoService) { }

  /**
   * will understand showld show the edit button or no
   * if there is clicked edit button after editing the content it will 
   * change todo with service
   */
  showEdit(): void {
    this.isEditable = !this.isEditable
    if (this.isEditable == false) {
      this.editTodo()
    }
  }

  /**
   * will emit event for remove todo
   */
  removeTodo(): void {
    this.removeEvent.emit(this.toDo);
  }

  /**
   * will make call to the backend and will mark todo as completed
   */
  markAsComplated(): void {
    if (!this.toDo) return
    this.toDo.completed = !this.toDo?.completed
    this.todoService.editTodo(this.toDo).subscribe()
  }

  /**
   * handle edit todo
   */
  editTodo(): void {
    if (!this.toDo) return
    this.todoService.editTodo(this.toDo).subscribe()
  }
}
