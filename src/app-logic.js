/* eslint-disable linebreak-style */
import Project from './project';

/* eslint-disable linebreak-style */
const storage = localStorage.getItem('projects')
  ? JSON.parse(localStorage.getItem('projects')).map(project => Project(project.title, project.tasks))
  : [];

const app = (() => {
  const update = () => localStorage.setItem('projects', JSON.stringify(storage));

  const setLastSelectedProject = ({ title }) => localStorage.setItem('lastSelectedProject', title);

  const getLastSelectedProject = () => localStorage.getItem('lastSelectedProject');

  const getAllProjects = () => storage.slice();


  const addProject = (project) => {
    if (project) {
      storage.push(project);
      update();
    }
    return project;
  };

  const getProject = (title) => {
    const project = storage.find(element => element.title === title);
    return project || null;
  };

  const addTodo = (project, todo) => {
    if (getProject(project.title)) {
      project.addTask(todo);
      update();
    }
    return todo;
  };


  const editTodo = (project, oldTodoId, newTodo) => {
    if (getProject(project.title)) {
      if (project.editTask(oldTodoId, newTodo)) {
        update();
        return true;
      }
    }
    return false;
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

  const clearStorage = () => localStorage.clear();

  return {
    setLastSelectedProject,
    getLastSelectedProject,
    getAllProjects,
    getProject,
    addProject,
    addTodo,
    editTodo,
    setPriority,
    deleteProject,
    deleteTodo,
    clearStorage,
  };
})();

export default app;