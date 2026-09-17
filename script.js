const startingTodos = [
  { text: "Collect one interface that inspires me", completed: false },
  { text: "Sketch a tiny hero section", completed: false },
  { text: "Notice one detail I want to try", completed: true },
];

let todos = [...startingTodos];
const list = document.querySelector("#todo-list");
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");

function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const item = document.createElement("li");
    item.className = `todo-item${todo.completed ? " completed" : ""}`;
    item.innerHTML = `
      <input type="checkbox" id="todo-${index}" ${todo.completed ? "checked" : ""} aria-label="Mark ${todo.text} complete" />
      <label for="todo-${index}">${todo.text}</label>
      <button type="button" aria-label="Remove ${todo.text}">×</button>
    `;

    item.querySelector("input").addEventListener("change", () => {
      todos[index].completed = !todos[index].completed;
      renderTodos();
    });

    item.querySelector("button").addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos();
    });

    list.append(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.push({ text, completed: false });
  input.value = "";
  renderTodos();
  input.focus();
});

renderTodos();
