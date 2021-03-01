/* eslint-disable linebreak-style */
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import 'bootstrap';
import { format } from 'date-fns';

import DOM from './dom';
import Project from './project';
import App from './app-logic';
import ToDo from './todo';

if (App.getProject('Default') == null) {
  const defaultProject = Project('Default');
  App.addProject(defaultProject);
  App.setLastSelectedProject(defaultProject);
}

// Load Projects into project selection bar
DOM.loadProjectOptions(App.getAllProjects());
DOM.selectProject(App.getLastSelectedProject());


// Load Tasks into to-do list
DOM.loadTaskItems(App.getProject(DOM.currentProjectTitle()).getAllTasks());

// set minimum value for date select in new task adding form
DOM.dueDateMin(format(Date.now(), 'yyyy-MM-dd'));

// Add listener for Project select
const s = document.getElementById('p-select');
s.addEventListener('change', () => {
  const project = App.getProject(DOM.currentProjectTitle());
  App.setLastSelectedProject(project);
  DOM.clearTaskList();
  DOM.loadTaskItems(project.getAllTasks());
});

// Add listener for the create project button
document.getElementById('project-btn').onclick = DOM.addProjectBtnAction.bind(DOM, (title) => {
  if (App.getProject(title)) return false;
  const newProject = Project(title);
  App.addProject(newProject);
  DOM.addProjectOption(newProject);
  return true;
});

// Add listener for the add new task form
document.getElementById('addTaskForm').addEventListener('submit', event => {
  event.preventDefault();
  DOM.addTaskBtnAction((title, description, dueDate, priority) => {
    const currentProject = App.getProject(DOM.currentProjectTitle());
    if (currentProject.find(title)) return false;
    const id = currentProject.last() ? currentProject.last().id + 1 : 0;
    const toDo = ToDo(id, title, description, format(dueDate, 'do MMMM yyyy'), priority);
    App.addTodo(currentProject, toDo);
    DOM.addTaskItem(toDo);
    return true;
  });
});

// Add listeners for expand buttons on todos
const btns = Array.from(document.getElementsByClassName('btn-expand'));
btns.forEach(btn => {
  btn.onclick = () => {
    if (btn.innerText === 'Show details') btn.innerText = 'Hide details';
    else btn.innerText = 'Show details';
  };
  btn.onblur = () => { btn.innerText = 'Show details'; };
});
