/* eslint-disable linebreak-style */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import DOM from './dom';
import Project from './project';
import App from './app-logic';

DOM.loadProjectOptions(App.getAllProjects().map(element => element.title));

document.getElementById('project-btn').onclick = DOM.addProjectBtnAction.bind(DOM, (title) => {
  const newProject = Project(title);
  App.addProject(newProject);
  DOM.addProjectOption(title, App.getAllProjects().length);
});
