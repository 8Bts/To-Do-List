/* eslint-disable linebreak-style */
const dom = (() => {
  let toggle = true;
  const projectBtn = document.getElementById('project-btn');
  const projectInput = document.getElementById('input-project');
  const pSelect = document.getElementById('p-select');

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
      const flash = document.getElementById('successSpan');
      if (flash) flash.remove();
    } else {
      const input = projectInput.value;
      if (input) {
        toggle = true;
        projectInput.style.visibility = 'hidden';
        projectBtn.innerHTML = 'Create Project';
        action(input);
        projectInput.value = '';
        projectInput.style = '';
        const success = document.createElement('span');
        success.innerText = `${input} added to list!`;
        success.className = 'success-span';
        success.id = 'successSpan';
        document.getElementById('p-add-cont').appendChild(success);
      } else {
        projectInput.style.borderColor = '#e86868';
        projectInput.style.boxShadow = 'rgba(220, 53, 69, 0.24) 0px 0px 0px 0.25rem';
      }
    }
    return action;
  };

  return { addProjectOption, loadProjectOptions, addProjectBtnAction };
})();

export default dom;