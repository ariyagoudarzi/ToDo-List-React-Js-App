import { Form } from "./Form";

export function AddTaskForm({
  task,
  onSetTask,
  taskList,
  onSetTaskList,
  isFocus,
  onFocus,
}) {
  function handleAddTask(e) {
    e.preventDefault();
    if (!task || task === " ") return;

    const taskDate = `${new Date().getFullYear()}, ${new Date().getMonth()},${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}`;
    const newTask = {
      title: task.trim(),
      id: crypto.randomUUID(),
      checked: false,
      date: taskDate,
    };

    onSetTaskList([...taskList, newTask]);
    onSetTask("");
  }
  return (
    <Form
      value={task}
      onValue={onSetTask}
      handleValue={handleAddTask}
      isFocus={isFocus}
      onFocus={onFocus}
    />
  );
}
