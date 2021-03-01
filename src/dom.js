/* eslint-disable linebreak-style */

import $ from 'jquery';

const dom = (() => {
  let toggle = true;
  const projectBtn = document.getElementById('project-btn');
  const projectInput = document.getElementById('input-project');
  const pSelect = document.getElementById('p-select');

  const currentProjectTitle = () => pSelect.value;

  const selectProject = (title) => { pSelect.value = title; };

  const dueDateMin = (dateString) => {
    document.getElementById('due-date').setAttribute('min', dateString);
  };

  const addTaskItem = ({
    id, title, description, dueDate,
  }) => {
    description = description || 'N/A';
    const lItem = `<li class="list-group-item">
                    <div class="card border-0">
                      <div class="card-body d-flex justify-content-between">
                        <div>
                          <h5 class="card-title d-inline-block">${title}</h5>
                        </div>
                        <button class="btn-expand btn btn-link text-left" type="button" data-toggle="collapse" data-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">Show details</button>
                      </div>
                    </div>
                    <div id="collapse${id}" class="collapse" aria-labelledby="headingOne" data-parent="#tasksList">
                      <div class="card-body pt-0">
                          <span class="badge badge-primary text-white">Due ${dueDate}</span>
                          <p class="card-text mt-3">Note: ${description}</p>
                          <a href="#" class="btn btn-sm btn-outline-success">Mark as Complete</a>
                          <a href="#" class="btn btn-sm btn-outline-info">Edit</a>
                          <a href="#" class="btn btn-sm btn-outline-danger">Delete</a>
                      </div>
                   </div>
                  </li>`;

    document.getElementById('tasksList').insertAdjacentHTML('beforeend', lItem);
  };

  const loadTaskItems = (tasks) => {
    tasks.forEach(task => {
      addTaskItem(task);
    });
  };

  const clearTaskList = () => {
    const list = Array.from(document.getElementsByTagName('li'));
    // list.concat(Array.from(document.getElementsByClassName('collapse')));

    list.forEach(element => element.remove());
  };

  const addProjectOption = ({ title }) => {
    const opt = document.createElement('option');
    opt.setAttribute('value', title);
    opt.innerHTML = title;
    pSelect.appendChild(opt);
  };

  const loadProjectOptions = (projects) => {
    projects.forEach((project) => {
      addProjectOption(project);
    });
  };

  const addProjectBtnAction = (action) => {
    if (toggle) {
      toggle = false;
      projectInput.style.visibility = 'visible';
      projectBtn.innerHTML = 'OK';
      const flash = document.getElementById('flashSpanP');
      if (flash) flash.remove();
    } else {
      const input = projectInput.value;
      if (input) {
        toggle = true;
        projectInput.style.visibility = 'hidden';
        projectBtn.innerHTML = 'Create Project';
        const flash = document.createElement('span');
        flash.className = 'flash-span-p-input';
        flash.id = 'flashSpanP';
        if (action(input)) {
          flash.innerText = 'Project created!';
          flash.style.color = 'var(--success)';
          document.getElementById('p-add-cont').appendChild(flash);
        } else {
          flash.innerText = 'Project exists!';
          flash.style.color = 'var(--danger)';
          document.getElementById('p-add-cont').appendChild(flash);
        }
        projectInput.value = '';
        projectInput.style = '';
        setTimeout(() => flash.remove(), 3000);
      } else {
        projectInput.style.borderColor = '#e86868';
        projectInput.style.boxShadow = 'rgba(220, 53, 69, 0.24) 0px 0px 0px 0.25rem';
      }
    }
    return action;
  };

  const addTaskBtnAction = (action) => {
    const title = document.getElementById('task-title');
    const description = document.getElementById('task-description');
    const dueDate = new Date(document.getElementById('due-date').value.split('-'));
    const priority = document.getElementById('task-priority');
    let flash = document.getElementById('flashSpanT');

    // If task successfully added
    if (action(title.value, description.value, dueDate, priority.value)) {
      $('#newTaskModal').modal('hide');
      if (flash) flash.remove();
      title.style = '';
      window.location.reload();
    } else {
      title.focus({ preventScroll: false });
      title.style.borderColor = '#e86868';
      title.style.boxShadow = 'rgba(220, 53, 69, 0.24) 0px 0px 0px 0.25rem';
      if (flash == null) {
        flash = document.createElement('span');
        flash.className = 'text-danger';
        flash.id = 'flashSpanT';
        flash.innerText = '* The task with this title already exists!';
        document.querySelector('.form-title-cont').appendChild(flash);
      }
    }
  };

  return {
    selectProject,
    currentProjectTitle,
    dueDateMin,
    addTaskItem,
    loadTaskItems,
    clearTaskList,
    addProjectOption,
    loadProjectOptions,
    addProjectBtnAction,
    addTaskBtnAction,
  };
})();

export default dom;