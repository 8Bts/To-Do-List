/* eslint-disable linebreak-style */
const Project = (title, toDos = []) => {
  const tasks = toDos;

  const addTask = (todo) => tasks.push(todo);

  const removeTask = (id) => {
    const task = tasks.find(element => element.id === id);
    if (task) tasks.splice(id, 1);
    else return null;
    return task;
  };

  const getAllTasks = () => tasks;

  const last = () => tasks[tasks.length - 1];

  const find = (taskTitle) => tasks.find(element => element.title === taskTitle);

  return {
    addTask, removeTask, getAllTasks, last, find, title, tasks,
  };
};

export default Project;