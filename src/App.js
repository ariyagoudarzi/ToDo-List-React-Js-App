import { useState } from "react";
import { TaskItem } from "./TaskItem";
import { AddTaskForm } from "./AddTaskForm";

const initialTasks = [
  {
    title: "Star The Repository ⭐️",
    id: crypto.randomUUID(),
    checked: false,
    date: "2024, 8, 2 22:12",
  },
  {
    title: "Did you star the repository?",
    id: crypto.randomUUID(),
    checked: false,
    date: "2022, 5, 3 12:12",
  },
];

export function Button({ onClick, classNameStyle, children }) {
  return (
    <button className={classNameStyle} onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [taskList, setTaskList] = useState(initialTasks);
  const [task, setTask] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isOpenSetting, setIsOpenSetting] = useState(false);

  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") {
    sortedItems = taskList;
  } else if (sortBy === "description") {
    sortedItems = taskList
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "packed") {
    sortedItems = taskList.slice().sort((a, b) => +a.checked - +b.checked);
  }

  function handleDeleteItem(id) {
    setTaskList((items) => items.filter((item) => item.id !== id));
  }

  function handleCheckItem(id) {
    setTaskList((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  return (
    <>
      <Logo>Aria Gdrz</Logo>
      {isOpen ? (
        <div className="app">
          <div className="task-box box-shadow">
            <CloseBtn
              onOpen={setIsOpen}
              styleArr={{
                display: "flex",
                justifyContent: "end",
                margin: "10px 15px 30px 0",
              }}
            />
            <div className="task-container">
              <AddTaskForm
                task={task}
                onSetTask={setTask}
                taskList={taskList}
                onSetTaskList={setTaskList}
                isFocus={isFocus}
                onFocus={setIsFocus}
              />

              {isOpenSetting ? (
                <div className="task-list-setting">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="input"> Sort by input</option>
                    <option value="description"> Sort by title</option>
                    <option value="packed"> Sort by checked item</option>
                  </select>

                  <Button
                    classNameStyle="task-item-btn clear-btn"
                    onClick={() => setTaskList([])}
                  >
                    Clear List
                  </Button>
                  <CloseBtn
                    onOpen={setIsOpenSetting}
                    styleArr={{
                      margin: "10px 0 0 0",
                    }}
                  />
                </div>
              ) : (
                <div
                  onClick={() => setIsOpenSetting(true)}
                  style={{
                    padding: "0.65rem 1.7rem 0 0",
                    display: "flex",
                    justifyContent: "end",
                    cursor: "pointer",
                  }}
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/ifsxxxte.json"
                    trigger="hover"
                    colors="primary:#adb5bd"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>
                </div>
              )}

              <ul className="task-list">
                {sortedItems.map((task, i) => (
                  <TaskItem
                    task={task}
                    num={i}
                    key={task.id}
                    onDeleteItem={handleDeleteItem}
                    onCheckItem={handleCheckItem}
                    isFocus={isFocus}
                    onFocus={setIsFocus}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <Button
          classNameStyle="custom-btn btn-5"
          onClick={() => setIsOpen(true)}
        >
          <span>Open</span>
        </Button>
      )}
    </>
  );
}

function Logo({ children }) {
  return (
    <div className="git-hub-logo">
      <img src="github-mark.svg" alt="Logo" />
      <a href="https://github.com/ariyagoudarzi/">{children}</a>
    </div>
  );
}

function CloseBtn({ onOpen, styleArr }) {
  return (
    <div onClick={() => onOpen(false)} style={styleArr}>
      <lord-icon
        src="https://cdn.lordicon.com/zxvuvcnc.json"
        trigger="hover"
        state="hover-cross-2"
        colors="primary:#adb5bd"
        style={{ width: "27px", height: "27px", cursor: "pointer" }}
      ></lord-icon>
    </div>
  );
}

export function Form({ value, onValue, handleValue, isFocus, onFocus }) {
  function handleAddShadow() {
    onFocus(true);
  }
  return (
    <form onSubmit={handleValue}>
      <input
        type="text"
        placeholder="Put Your Task..."
        value={value}
        onChange={(e) => onValue(e.target.value)}
        className={isFocus ? "box-shadow" : ""}
        onFocus={handleAddShadow}
      />
      <Button classNameStyle={`addBtn ${isFocus ? "box-shadow" : ""}`}>
        <b>
          Add <i class="fa-solid fa-plus"></i>
        </b>
      </Button>
    </form>
  );
}
