import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface IToDo {
  id?: string
  content: string
  completed: boolean
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // switched to public to be able to access it in spec file.
  API_URL = 'http://localhost:5000/'

  constructor(
    public http: HttpClient,
  ) { }

  /**
   * will get all todos
   * @returns 
   */
  getAllTodos(): Observable<IToDo[]> {
    return this.http.get<IToDo[]>(this.API_URL)
  }

  /**
   * will create the todo 
   * @param todo object of the new created todo
   * @returns todo object with id 
   */
  addTodo(todo: IToDo) {
    const data = {
      "new-todo": todo
    }
    return this.http.post<IToDo>(this.API_URL, data)
  }

  /**
   * will make call for the todo delete
   * @param id oid of the todo, as string
   */
  removeTodo(id: string): Observable<null> {
    return this.http.delete<null>(this.API_URL + id)
  }

  editTodo(todo: IToDo) {
    return this.http.put(this.API_URL + todo.id, todo)
  }

}