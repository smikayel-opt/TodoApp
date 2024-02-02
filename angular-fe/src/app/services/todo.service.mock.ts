import { TodoService } from "./todo.service";


/**
 * returns mock Todo Service
 */
export function mockTodoService(): TodoService {
  return {
    API_URL: 'https://api.themoviedb.org/3',
 
    http: jasmine.createSpyObj('HttpClient', ['get']),

    getAllTodos: jasmine.createSpy('getAllTodos'),
    addTodo: jasmine.createSpy('addTodo'),
    removeTodo: jasmine.createSpy('removeTodo'),
    editTodo: jasmine.createSpy('editTodo'),
  };
}
