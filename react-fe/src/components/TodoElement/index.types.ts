import { ITodo } from "../../services/model.types";

export interface IProps {
  task: ITodo;
  handleDeleteTodo: (id: number) => void;
}
