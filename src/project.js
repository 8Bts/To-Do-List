/* eslint-disable linebreak-style */
const Project = (title, toDos = []) => {
  const tasks = toDos;

  const addTask = (todo) => tasks.push(todo);

  const removeTask = (id) => {
    const task = tasks.find(element => element.id === Number(id));
    const idx = tasks.indexOf(task);
    if (task) tasks.splice(idx, 1);
    else return false;
    return true;
  };

  const getTask = (id) => tasks.find(element => element.id === Number(id));

  const editTask = (oldTaskId, newTask) => {
    const idx = tasks.indexOf(getTask(oldTaskId));
    if (idx !== -1) tasks[idx] = newTask;
    else return false;
    return true;
  };

  const getAllTasks = () => tasks;

  const last = () => tasks[tasks.length - 1];

  const find = (taskTitle) => tasks.find(element => element.title === taskTitle);


  return {
    addTask, removeTask, getAllTasks, last, find, getTask, editTask, title, tasks,
  };
};

export default Project;