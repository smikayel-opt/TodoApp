import { TodoComponent } from './todo.component';
import { IToDo, TodoService } from '../../../services/todo.service';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let todoService: jasmine.SpyObj<TodoService>;

  beforeEach(() => {
    todoService = jasmine.createSpyObj('TodoService', ['getAllTodos', 'addTodo', 'removeTodo', 'editTodo']);
    component = new TodoComponent(todoService);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('showEdit', () => {
    it('should toggle isEditable property and call editTodo when isEditable is set to false', () => {
      component.isEditable = true;
      spyOn(component, 'editTodo');
      component.showEdit();
      expect(component.isEditable).toBe(false);
      expect(component.editTodo).toHaveBeenCalled();
    });

    it('should toggle isEditable property without calling editTodo when isEditable is set to true', () => {
      component.isEditable = false;
      spyOn(component, 'editTodo');
      component.showEdit();
      expect(component.isEditable).toBe(true);
      expect(component.editTodo).not.toHaveBeenCalled();
    });
  });

  describe('removeTodo', () => {
    it('should emit removeEvent with the correct todo when removeTodo is called', () => {
      const toDoMock = { id: 'oid', content: 'Sample Todo', completed: false };
      component.toDo = toDoMock;
      spyOn(component.removeEvent, 'emit');
      component.removeTodo();
      expect(component.removeEvent.emit).toHaveBeenCalledWith(toDoMock);
    });
  });
});
