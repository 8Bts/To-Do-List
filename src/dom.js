/* eslint-disable linebreak-style */
const dom = (() => {
  let toggle = true;
  const projectBtn = document.getElementById('project-btn');
  const projectInput = document.getElementById('input-project');
  const pSelect = document.getElementById('p-select');

  const dueDateMin = (dateString) => {
    document.getElementById('due-date').setAttribute('min', dateString);
  };

  const addProjectOption = (title, id) => {
    const opt = document.createElement('option');
    opt.setAttribute('value', id);
    opt.innerHTML = title;
    pSelect.appendChild(opt);
  };

  const loadProjectOptions = (titles) => {
    titles.forEach((title, idx) => {
      addProjectOption(title, idx);
    });
  };

  const addProjectBtnAction = (action) => {
    if (toggle) {
      toggle = false;
      projectInput.style.visibility = 'visible';
      projectBtn.innerHTML = 'OK';
      const flash = document.getElementById('flashSpan');
      if (flash) flash.remove();
    } else {
      const input = projectInput.value;
      if (input) {
        toggle = true;
        projectInput.style.visibility = 'hidden';
        projectBtn.innerHTML = 'Create Project';
        const flash = document.createElement('span');
        flash.className = 'flash-span';
        flash.id = 'flashSpan';
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

  };

  return {
    dueDateMin, addProjectOption, loadProjectOptions, addProjectBtnAction, addTaskBtnAction,
  };
})();

export default dom;