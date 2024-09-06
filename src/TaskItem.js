import { Button } from "./App";

export function TaskItem({ task, num, onDeleteItem, onCheckItem, isFocus }) {
  return (
    <div className="task-item-box" title={task.date}>
      <span className={task.checked ? "checked-task" : ""}>
        <b>{num + 1}</b>
      </span>
      <li className={`task-item ${task.checked ? "checked-task" : ""}`}>
        <p>{task.title}</p>
      </li>
      <div className="btn-box">
        <Button
          classNameStyle={`task-item-btn del-btn ${
            isFocus ? "box-shadow" : ""
          }`}
          onClick={() => onDeleteItem(task.id)}
        >
          <lord-icon
            src="https://cdn.lordicon.com/skkahier.json"
            trigger="hover"
            colors="primary:#dee2e6"
            style={{ width: "21px", height: "21px" }}
          ></lord-icon>
        </Button>
        <Button
          classNameStyle="task-item-btn check-btn"
          onClick={() => onCheckItem(task.id)}
        >
          {task.checked ? (
            <i className="fa-solid fa-circle-check"></i>
          ) : (
            <i className="fa-regular fa-circle-check"></i>
          )}
        </Button>
      </div>
    </div>
  );
}
