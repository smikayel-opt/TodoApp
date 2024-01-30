import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL as string;

class TodoService {
  async getAllTodos() {
    const response = await axios.get(API_URL);
    return response.data;
  }

  async createTodo(title: string) {
    const response = await axios.post(API_URL, { title });
    return response.data;
  }

  async deleteTodo(id: number) {
    return axios.delete(API_URL + `delete/${id}`);
  }

  markComplated(id: number) {
    return axios.put(API_URL + `update/${id}`);
  }
}

const todoService = new TodoService()
export default todoService;
