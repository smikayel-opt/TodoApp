import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IProps } from "./index.types";
import todoService from "../../services/todoService/todo.service";

export const TaskElement = ({ task, handleDeleteTodo }: IProps) => {
  const [completed, setComplated] = useState(task.complete);

  const handleCheckboxChange = async () => {
    await todoService.markComplated(task.id);
    setComplated(!completed);
  };

  return (
    <div className="flex bg-slate-100 m-4 py-4 pl-12 pr-4 rounded-md">
      <input
        type="checkbox"
        onChange={handleCheckboxChange}
        className="mr-2"
        checked={completed}
      />
      <li className="self-center font-semibold pr-10 mr-6 grow">
        {task.title}
        <span
          className={`inline-block ${
            completed
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          } px-2 py-1 ml-2 rounded  text-sm font-semibold`}
        >
          {
            completed
            ? "Completed"
            : "Not completed"
          }
        </span>
      </li>

      <button
        onClick={() => handleDeleteTodo(task.id)}
        className="bg-red-500 text-white p-2 mx-1 rounded-md font-bold hover:bg-red-600"
      >
        <FaTrash />
      </button>
    </div>
  );
};
