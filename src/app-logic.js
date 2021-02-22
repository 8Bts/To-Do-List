/* eslint-disable linebreak-style */
const storage = localStorage.getItem('projects')
  ? JSON.parse(localStorage.getItem('projects'))
  : [];

const app = (() => {
  const update = () => localStorage.setItem('projects', JSON.stringify(storage));
  const getProject = (title) => {
    const project = storage.find(element => element.title === title);
    return project || null;
  };

  const addProject = (project) => {
    if (project) {
      storage.push(project);
      update();
    }
    return project;
  };

  const addTodo = (project, todo) => {
    if (getProject(project)) {
      project.addTask(todo);
      update();
    }
    return todo;
  };

  const markAsComplete = (todo) => {
    if (todo) {
      todo.completed = true;
      update();
    }
    return todo;
  };

  const editTodo = (todo, newTodo) => {
    if (todo) {
      Object.assign(todo, newTodo);
      update();
    }
    return newTodo;
  };

  const setPriority = (todo, value) => {
    if (todo) {
      todo.priority = value;
      update();
    }
    return todo;
  };

  const deleteProject = (title) => {
    const project = getProject(title);
    const projectIdx = storage.indexOf(project);

    if (project) {
      storage.splice(projectIdx, 1);
      update();
    }
    return project;
  };

  const deleteTodo = (project, todoId) => {
    if (project) {
      project.removeTask(todoId);
      update();
    }
    return project;
  };

  return {
    getProject,
    addProject,
    addTodo,
    markAsComplete,
    editTodo,
    setPriority,
    deleteProject,
    deleteTodo,
  };
})();

export default app;