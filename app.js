// ------------------- DOM objects -------------------

const input = document.querySelector('input');
const tasks = document.querySelector('.tasks');
const addForm = document.querySelector('.add');
const date = document.querySelector('.date');
const textInfo = document.querySelector('.text-info');
const activeTask = document.querySelector('.active');
const error = document.querySelector('.error');
const completeNav = document.querySelector('.complete-nav');
const completeTasks = document.querySelector('.complete-tasks');
const incompleteNav = document.querySelector('.incomplete-nav');
const editBtn = document.querySelector('.edit-btn');
const taskText = document.querySelector('.task-text');
const task = document.querySelector('.task');

let todoList = [];
let doneList = [];

// ------------------ functions ----------------
// loading current time to the app
window.onload = function () {
  let newDate = new Date();
  date.innerHTML = newDate.toDateString();

  // rendering localStorage TodoList
  const localTodo = JSON.parse(localStorage.todoList);
  localTodo.forEach((todo) => {
    renderTodo(todo);
  });

  const localDone = JSON.parse(localStorage.doneList);
  localDone.forEach((done) => {
    doneList.push(done);
  });
};
// generate html template for rendering to DOM
const generateTemplate = (todo) => {
  const html = `
  <div class="task" id=${todoList.length}>
            <svg class="check-mark complete" xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" style=""><circle class="complete" cx="9.5" cy="9.5" r="9" stroke="#8D9196" style=""></circle><path class="complete" fill="#8D9196" d="M14 6.5a.6.6 0 0 0-.7 0l-5 4.9-2.6-2.6a.6.6 0 0 0-.7.8l3 3a.6.6 0 0 0 .7 0L14 7.1c.3-.2.3-.5 0-.7z" style=""></path></svg>

            <p class="task-text" id=${todoList.length + 'a'}>${todo}</p>

            <button class="edit-btn">Edit</button>

            <svg class="trash-can delete" xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none"><path class="delete" fill="#8D9196" d="M17.4 2.7h-4v-.6c0-1.2-.9-2.1-2-2.1H7.6a2 2 0 0 0-2 2v.7h-4c-.3 0-.5.3-.5.6s.2.5.5.5h1v12.4c0 1.5 1.2 2.8 2.8 2.8h8.2c1.6 0 2.9-1.3 2.9-2.8V3.8h1c.2 0 .4-.2.4-.5s-.2-.6-.5-.6zM6.6 2.1c0-.6.5-1 1-1h3.8c.5 0 1 .4 1 1v.6H6.6v-.6zm8.8 14c0 1-.8 1.8-1.8 1.8H5.4c-1 0-1.8-.7-1.8-1.7V3.8h11.8v12.4z"></path><path class="delete" fill="#8D9196" d="M9.5 16c.3 0 .5-.2.5-.5V6.2c0-.3-.2-.5-.5-.5s-.5.2-.5.5v9.3c0 .3.2.6.5.6zM6 15.5c.4 0 .6-.3.6-.6V6.8c0-.3-.2-.5-.5-.5s-.6.2-.6.5v8.1c0 .3.3.6.6.6zM13 15.5c.2 0 .5-.3.5-.6V6.8c0-.3-.3-.5-.6-.5s-.5.2-.5.5v8.1c0 .3.2.6.5.6z"></path></svg>

          
          </div>`;

  tasks.innerHTML += html;
};

const renderTodo = (todo) => {
  textInfo.style.display = 'none';
  generateTemplate(todo);
  todoList.push(todo);
  updateActiveTask();
  addForm.reset();
};
// update the active task status bar
const updateActiveTask = () => {
  numTasks = todoList.length;
  activeTask.textContent = numTasks;
};

const renderCompleteTask = (done) => {
  const html = `
  <div class="task completed" id="${doneList.length}">


  <svg style="color:red" class="check-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      d="M154.7 213.3H16a16 16 0 0 1-16-16V58.7a16 16 0 0 1 32 0v122.6h122.7a16 16 0 0 1 0 32zm0 0"
    ></path>
    <path
      d="M256 512a254.1 254.1 0 0 1-181-75 16 16 0 1 1 22.7-22.7A222.3 222.3 0 0 0 256 480c123.5 0 224-100.5 224-224S379.5 32 256 32C150.1 32 55.7 103.1 31.6 201.2a16 16 0 1 1-31.1-7.7C28.2 81.4 135.6 0 256 0c141.2 0 256 114.8 256 256S397.2 512 256 512zm0 0"
    ></path>
  </svg>



  <p class="task-text">${done}</p>
  <svg
    class="trash-can delete"
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="19"
    fill="none"
  >
    <path
      class="delete"
      fill="#8D9196"
      d="M17.4 2.7h-4v-.6c0-1.2-.9-2.1-2-2.1H7.6a2 2 0 0 0-2 2v.7h-4c-.3 0-.5.3-.5.6s.2.5.5.5h1v12.4c0 1.5 1.2 2.8 2.8 2.8h8.2c1.6 0 2.9-1.3 2.9-2.8V3.8h1c.2 0 .4-.2.4-.5s-.2-.6-.5-.6zM6.6 2.1c0-.6.5-1 1-1h3.8c.5 0 1 .4 1 1v.6H6.6v-.6zm8.8 14c0 1-.8 1.8-1.8 1.8H5.4c-1 0-1.8-.7-1.8-1.7V3.8h11.8v12.4z"
    ></path>
    <path
      class="delete"
      fill="#8D9196"
      d="M9.5 16c.3 0 .5-.2.5-.5V6.2c0-.3-.2-.5-.5-.5s-.5.2-.5.5v9.3c0 .3.2.6.5.6zM6 15.5c.4 0 .6-.3.6-.6V6.8c0-.3-.2-.5-.5-.5s-.6.2-.6.5v8.1c0 .3.3.6.6.6zM13 15.5c.2 0 .5-.3.5-.6V6.8c0-.3-.3-.5-.6-.5s-.5.2-.5.5v8.1c0 .3.2.6.5.6z"
    ></path>
  </svg>
</div>
`;
  completeTasks.innerHTML += html;
};

const getInputValue = () => {
  return inputVal;
};

// ---------------- event listeners ----------------
// rendering input task from user into task list
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();

  if (todo.length) {
    renderTodo(todo);
    error.style.opacity = 0;
  }
  if (!todo.length) {
    error.style.opacity = 1;
  }
  localStorage.setItem('todoList', JSON.stringify(todoList));
});

// updating the task list and active task status bar
tasks.addEventListener('click', (e) => {
  const divChildren = e.target.closest('div').children;
  const divArr = [...divChildren];
  let taskTitle;
  let paragraphEl;
  divArr.forEach((child) => {
    if (child.tagName === 'P') {
      taskTitle = child.innerText;
      paragraphEl = child;
    }
  });

  // deleting a task
  if (e.target.classList.contains('delete')) {
    e.target.closest('div').remove();

    const idx = todoList.indexOf(taskTitle);
    todoList.splice(idx, 1);
    updateActiveTask();
    localStorage.setItem('doneList', JSON.stringify(doneList));
    localStorage.setItem('todoList', JSON.stringify(todoList));

    // completing a task
  } else if (e.target.classList.contains('complete')) {
    // finding the completed task , remove it from task list and todoList

    e.target.closest('div').remove();
    doneList.push(taskTitle);
    const idx = todoList.indexOf(taskTitle);
    todoList.splice(idx, 1);
    updateActiveTask();

    // saving completed task to LocalStorage.doneList and re-assing the todoList to loaclStorage
    // -------------------
    localStorage.setItem('todoList', JSON.stringify(todoList));
    localStorage.setItem('doneList', JSON.stringify(doneList));
    // -------------------
  } else if (e.target.classList.contains('edit-btn')) {
    let newInput = `
    <input class="edit-input" value="${taskTitle}"> 
    <button class="okey-btn">Set</button>`;

    paragraphEl.innerHTML = newInput;
  } else if (e.target.classList.contains('okey-btn')) {
    let inputVal = document.querySelector('.edit-input').value;
    paragraphEl.innerText = inputVal;
  }
});

// compeleting a task , updating UI and pushing it to the "compelete task" page

completeNav.addEventListener('click', (e) => {
  completeTasks.classList.remove('hide');
  completeTasks.classList.add('show');
  tasks.classList.remove('show');
  tasks.classList.add('hide');
  completeTasks.innerHTML = '';

  doneList.forEach((done) => {
    renderCompleteTask(done);
  });
});

incompleteNav.addEventListener('click', (e) => {
  completeTasks.classList.remove('show');
  completeTasks.classList.add('hide');
  tasks.classList.remove('hide');
  tasks.classList.add('show');
});

// Deleting a completed task
completeTasks.addEventListener('click', (e) => {
  const taskTitle = e.target.closest('div').innerText;
  if (e.target.classList.contains('delete')) {
    e.target.closest('div').remove();
    const idx = doneList.indexOf(taskTitle);
    doneList.splice(idx, 1);
    localStorage.setItem('doneList', JSON.stringify(doneList));
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }
});
