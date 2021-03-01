/* eslint-disable linebreak-style */
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import 'bootstrap';
import { format } from 'date-fns';

import DOM from './dom';
import Project from './project';
import App from './app-logic';
import ToDo from './todo';

if (App.getProject('Default') == null) App.addProject(Project('Default'));

// Load Projects into project selection bar
DOM.loadProjectOptions(App.getAllProjects());

// Load Tasks into to-do list
DOM.loadTaskItems(App.getProject(DOM.currentProjectTitle()).getAllTasks());

// set minimum value for date select in new task adding form
DOM.dueDateMin(format(Date.now(), 'yyyy-MM-dd'));

// Add listener for the create project button
document.getElementById('project-btn').onclick = DOM.addProjectBtnAction.bind(DOM, (title) => {
  if (App.getProject(title)) return false;
  const newProject = Project(title);
  App.addProject(newProject);
  DOM.addProjectOption(title);
  return true;
});

// Add listener for the add new task form
document.getElementById('addTaskForm').addEventListener('submit', event => {
  event.preventDefault();
  DOM.addTaskBtnAction((title, description, dueDate, priority) => {
    const currentProject = App.getProject(DOM.currentProjectTitle());
    if (currentProject.find(title)) return false;
    const id = currentProject.last() ? currentProject.last().id + 1 : 0;
    const toDo = ToDo(id, title, description, dueDate, priority);
    App.addTodo(currentProject, toDo);
    DOM.addTaskItem(toDo);
    return true;
  });
});
