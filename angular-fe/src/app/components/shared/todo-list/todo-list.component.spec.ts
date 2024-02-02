

import { TodoListComponent } from './todo-list.component';
import { IToDo, TodoService } from '../../../services/todo.service';
import { of, throwError } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let mockTodoService: jasmine.SpyObj<TodoService>;

  beforeEach(() => {
    mockTodoService = jasmine.createSpyObj('TodoService', ['getAllTodos', 'addTodo', 'removeTodo', 'editTodo']);
    component = new TodoListComponent(mockTodoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getTodos during ngOnInit', () => {
      const mockTodos: IToDo[] = [{ id: '1', content: 'Todo 1', completed: false }];
      mockTodoService.getAllTodos.and.returnValue(of(mockTodos));

      spyOn(component, 'getTodos').and.callThrough();

      component.ngOnInit();

      expect(component.getTodos).toHaveBeenCalled();
      expect(component.todos).toEqual(mockTodos);
    });
  });

  describe('getTodos', () => {
    it('should get todos from the service', () => {
      const mockTodos: IToDo[] = [{ id: '1', content: 'Todo 1', completed: false }];
      mockTodoService.getAllTodos.and.returnValue(of(mockTodos));
      component.getTodos();
      expect(component.todos).toEqual(mockTodos);
    });
  });

  describe('addTodo', () => {
    it('should add a todo successfully', () => {
      const newTodo = 'Buy groceries';
      const mockTodo: IToDo = { id: 'oid', content: newTodo, completed: false };
      component.addTodo(newTodo);
      mockTodoService.addTodo.and.returnValue(of(mockTodo));
    });

    it('should not add a todo for empty input', () => {
      const newTodo = '';
      component.addTodo(newTodo);
      expect(component.todos.length).toBe(0);
      expect(component.newToDo).toEqual('');
    });

    it('should not add a todo for input with only whitespaces', () => {
      const newTodo = '   ';
      component.addTodo(newTodo);
      expect(component.todos.length).toBe(0);
      expect(component.newToDo).toEqual('');
    });
  });

  describe('removeTodo', () => {
    it('should not remove a todo when the input todo lacks an id', () => {
      const todoToRemove: IToDo = { content: 'Todo to remove', completed: false };
      component.removeTodo(todoToRemove);

      expect(mockTodoService.removeTodo).not.toHaveBeenCalled();
      expect(component.todos).toEqual([]);
    });

    it('should remove a todo and update the list', () => {
      const todoToRemove: IToDo = { id: '1', content: 'Todo 1', completed: false };
      mockTodoService.removeTodo.and.returnValue(of(null));
      component.todos = [todoToRemove, { id: '2', content: 'Another Todo', completed: true }];
      component.removeTodo(todoToRemove);
      if (todoToRemove.id) {
        expect(mockTodoService.removeTodo).toHaveBeenCalledWith(todoToRemove.id);
      }
      expect(component.todos).not.toContain(todoToRemove);
    });
  });


  describe('unComplatedCount', () => {
    it('should return the count of uncompleted todos', () => {
      component.todos = [
        { id: '5', content: 'Todo 1', completed: false },
        { id: '6', content: 'Todo 2', completed: true },
        { id: '7', content: 'Todo 3', completed: false }
      ];

      const result = component.unComplatedCount();

      expect(result).toEqual(2);
    });
  });
});
