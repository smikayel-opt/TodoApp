import { TestBed } from '@angular/core/testing';

import { IToDo, TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';


describe('TodoService', () => {
  let service: TodoService;
  let mockHttp: HttpClient;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete', 'put']);
    service = new TodoService(mockHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllTodos', () => {
    it('should get all todos', () => {
      const mockTodos: IToDo[] = [{ id: '1', content: 'Todo 1', completed: false }];
      (mockHttp.get as jasmine.Spy).and.returnValue(of(mockTodos));

      service.getAllTodos().subscribe((todos: IToDo[]) => {
        expect(todos).toEqual(mockTodos);
      });
    });

    it('should handle errors when getting all todos', () => {
      const errorMessage = 'Error fetching all todos';
      (mockHttp.get as jasmine.Spy).and.returnValue(throwError(errorMessage));

      service.getAllTodos().subscribe(
        () => fail('Should have thrown an error'),
        (error) => expect(error).toEqual(errorMessage)
      );
    });
  });

  describe('addTodo', () => {
    it('should add a new todo', () => {
      const mockTodo: IToDo = { content: 'New Todo', completed: false };
      (mockHttp.post as jasmine.Spy).and.returnValue(of(mockTodo));

      service.addTodo(mockTodo).subscribe((addedTodo: IToDo) => {
        expect(addedTodo).toEqual(mockTodo);
      });
    });

    it('should handle errors when adding a new todo', () => {
      const errorMessage = 'Error adding a new todo';
      (mockHttp.post as jasmine.Spy).and.returnValue(throwError(errorMessage));

      service.addTodo({ content: 'New Todo', completed: false }).subscribe(
        () => fail('Should have thrown an error'),
        (error) => expect(error).toEqual(errorMessage)
      );
    });
  });

  describe('removeTodo', () => {
    it('should remove a todo by id', () => {
      const todoId = '1';
      (mockHttp.delete as jasmine.Spy).and.returnValue(of(null));

      service.removeTodo(todoId).subscribe(() => {
        expect(mockHttp.delete).toHaveBeenCalledWith(service.API_URL + todoId);
      });
    });

    it('should handle errors when removing a todo by id', () => {
      const errorMessage = 'Error removing a todo';
      (mockHttp.delete as jasmine.Spy).and.returnValue(throwError(errorMessage));

      service.removeTodo('1').subscribe(
        () => fail('Should have thrown an error'),
        (error) => expect(error).toEqual(errorMessage)
      );
    });
  });

  describe('editTodo', () => {
    it('should edit a todo', () => {
      const mockTodo: IToDo = { id: '1', content: 'Updated Todo', completed: true };
      (mockHttp.put as jasmine.Spy).and.returnValue(of(null));

      service.editTodo(mockTodo).subscribe(() => {
        expect(mockHttp.put).toHaveBeenCalledWith(service.API_URL + mockTodo.id, mockTodo);
      });
    });

    it('should handle errors when editing a todo', () => {
      const errorMessage = 'Error editing a todo';
      (mockHttp.put as jasmine.Spy).and.returnValue(throwError(errorMessage));

      service.editTodo({ id: '1', content: 'Updated Todo', completed: true }).subscribe(
        () => fail('Should have thrown an error'),
        (error) => expect(error).toEqual(errorMessage)
      );
    });
  });
});