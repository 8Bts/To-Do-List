/* eslint-disable linebreak-style */
const ToDo = (id, title, description, dueDate, priority) => {
  id = Number(id);
  return {
    id, title, description, dueDate, priority,
  };
};

export default ToDo;