import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo-counter',
  standalone: true,
  imports: [],
  templateUrl: './todo-counter.component.html',
  styleUrl: './todo-counter.component.css'
})
export class TodoCounterComponent {
  @Input() todoCounter: number = 0
}
