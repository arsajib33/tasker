import { useState } from "react";
import AddTaskMOdal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn JavaScript",
    description: "I have to learn jasva script any how.",
    tags: ["js", "react"],
    priority: "High",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);

  const addTaskHandler = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          } else {
            return task;
          }
        })
      );
    }

    setShowAddModal(false);
    setTaskToUpdate(null);
  };

  const taskEditHandler = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };

  const taskDeleteHandler = (taskId) => {
    const deleteItem = tasks.filter((task) => task.id !== taskId);
    setTasks(deleteItem);
  };

  const handleCloseModal = () => {
    setTaskToUpdate(null);
    setShowAddModal(false);
  };

  const onSearch = (searchItem) => {
    setSearchKey(searchItem);
    // const unfiltereddata = [...tasks];
    // if (searchItem.length > 0) {
    //   const filtered = tasks.filter((task) =>
    //     task.title.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase())
    //   );
    //   console.log(filtered);
    //   setTasks([...filtered]);
    // } else {
    //   setTasks([...unfiltereddata]);
    // }
  };
  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskMOdal
          onSave={addTaskHandler}
          taskToUpdate={taskToUpdate}
          onCloseModal={handleCloseModal}
        />
      )}

      <div className="container">
        {/* Search Box */}
        <SearchTask onSearch={onSearch} />
        {/* Search Box Ends */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction onAddClick={() => setShowAddModal(true)} />
          <TaskList
            searchKey={searchKey}
            onEdit={taskEditHandler}
            onDelete={taskDeleteHandler}
            tasks={tasks}
          />
        </div>
      </div>
    </section>
  );
}
