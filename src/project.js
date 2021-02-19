/* eslint-disable linebreak-style */
const Project = (title) => {
  const tasks = [];

  const addTask = (todo) => tasks.push(todo);

  const removeTask = (id) => {
    const task = tasks.find(element => element.id === id);
    if (task) tasks.splice(id, 1);
    else return null;
    return task;
  };

  const last = () => tasks[tasks.length - 1];

  const find = (taskTitle) => tasks.find(element => element.title === taskTitle);

  return {
    addTask, removeTask, last, find, title,
  };
};

export default Project;