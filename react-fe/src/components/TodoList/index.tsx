import React, { useEffect, useState } from "react";
import { TaskElement } from "../TodoElement";
import todoService from "../../services/todoService/todo.service";
import { ITodo } from "../../services/model.types";

export const TodoList = () => {
  const [tasks, setTasks] = useState<ITodo[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await todoService.getAllTodos();
        setTasks(todos);
      } catch (err) {
        setTasks([]);
      }
    };

    getTodos();
  }, []);

  const addTasks = async () => {
    if (title !== "") {
      const createdTodo = await todoService.createTodo(title);
      setTitle("");
      setTasks([...tasks, createdTodo]);
    }
  };

  const deleteTasks = async (id: number) => {
    await todoService.deleteTodo(id);
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className=" flex flex-col items-center">
      <h1 className=" text-4xl m-16 font-bold">Todo List</h1>
      <div className="p-6">
        <input
          className=" bg-slate-100 rounded-md p-4 m-4"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Create a new todo"
        />
        <button
          onClick={addTasks}
          className=" bg-green-500 text-white p-3 m-3 rounded-md font-bold hover:bg-green-600"
        >
          Add Tasks
        </button>
      </div>
      <div>
        {tasks?.length > 0 ? (
          <ul>
            {tasks.map((todo: any) => (
              <TaskElement
                task={todo}
                handleDeleteTodo={deleteTasks}
                key={todo.title}
              />
            ))}
          </ul>
        ) : (
          <div>
            <p>No Task Found</p>
          </div>
        )}
      </div>
    </div>
  );
};
