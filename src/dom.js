/* eslint-disable linebreak-style */

import $ from 'jquery';

const dom = (() => {
  let toggle = true;
  const projectBtn = document.getElementById('project-btn');
  const projectInput = document.getElementById('input-project');
  const pSelect = document.getElementById('p-select');

  const currentProjectTitle = () => pSelect.value;

  const dueDateMin = (dateString) => {
    document.getElementById('due-date').setAttribute('min', dateString);
  };

  const addTaskItem = ({ title, description }) => {
    const lItem = ` <li class="list-group-item">
                      <div class="card border-0">
                        <div class="card-body">
                          <h5 class="card-title">${title}</h5>
                          <p class="card-text">${description}</p>
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
    currentProjectTitle,
    dueDateMin,
    addTaskItem,
    loadTaskItems,
    addProjectOption,
    loadProjectOptions,
    addProjectBtnAction,
    addTaskBtnAction,
  };
})();

export default dom;