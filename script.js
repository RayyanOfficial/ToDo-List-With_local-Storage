var taskInput = document.getElementById("task");
var list = document.getElementById("list");
var editLi = null;

// Load tasks when page loads
window.onload = loadTasks;

function addTask() {
  var txt = taskInput.value.trim();
  if (!txt) return;

  if (editLi) {
    editLi.firstChild.nodeValue = txt;
    editLi = null;
  } else {
    var li = createTaskElement(txt, false);
    list.appendChild(li);
  }

  taskInput.value = "";
  saveTasks(); // Save after add/edit
}

function delTask(btn) {
  btn.parentElement.remove();
  saveTasks();
}

function editTask(btn) {
  editLi = btn.parentElement;
  taskInput.value = editLi.firstChild.nodeValue;
}

// Create <li> with events
function createTaskElement(text, completed) {
  var li = document.createElement("li");
  li.textContent = text;

  if (completed) li.classList.add("completed");

  // Toggle completed
  li.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
  };

  // Buttons
  var editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = function (e) {
    e.stopPropagation(); // prevent li toggle
    editTask(this);
  };

  var delBtn = document.createElement("button");
  delBtn.textContent = "Del";
  delBtn.onclick = function (e) {
    e.stopPropagation();
    delTask(this);
  };

  li.appendChild(editBtn);
  li.appendChild(delBtn);

  return li;
}

// Save tasks in localStorage (as JSON)
function saveTasks() {
  var tasks = [];
  Array.from(list.children).forEach((li) => {
    tasks.push({
      text: li.firstChild.nodeValue,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  var data = localStorage.getItem("tasks");
  if (data) {
    var tasks = JSON.parse(data);
    tasks.forEach((t) => {
      var li = createTaskElement(t.text, t.completed);
      list.appendChild(li);
    });
  }
}
