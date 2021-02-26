/* eslint-disable linebreak-style */
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import $ from 'jquery';
import 'bootstrap';
import { format } from 'date-fns';

import DOM from './dom';
import Project from './project';
import App from './app-logic';

// Load Projects into project selection bar
DOM.loadProjectOptions(App.getAllProjects().map(element => element.title));

// set minimum value for date select in new task adding form
DOM.dueDateMin(format(Date.now(), 'yyyy-MM-dd'));

// Add listener for the create project button
document.getElementById('project-btn').onclick = DOM.addProjectBtnAction.bind(DOM, (title) => {
  if (App.getProject(title)) return false;
  const newProject = Project(title);
  App.addProject(newProject);
  DOM.addProjectOption(title, App.getAllProjects().length);
  return true;
});

// Add listener for the add new task form
document.querySelector('form').onsubmit = () => DOM.addTaskBtnAction.bind(DOM, () => {
  
});
