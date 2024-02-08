import { TodoService } from "./todo.service";


/**
 * returns mock Todo Service
 */
export function getMockTodoService(): jasmine.SpyObj<TodoService> {
  return jasmine.createSpyObj('TodoService', ['getAllTodos', 'addTodo', 'removeTodo', 'editTodo']);
}
