const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const date = document.querySelector("#task-date").value;
  const frequency = document.querySelector("#frequency").value;
  const body = document.querySelector("#task-body").value.trim();

  if (title && frequency && date) {
    const response = await fetch(`/api/tasks`, {
      method: "POST",
      body: JSON.stringify({ title, body, date, frequency }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("test");
      document.location.replace("/");
    } else {
      alert("Failed to create daily task");
    }
  } else {
    console.log(title + frequency + date);
  }
};

const deleteButton = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/profile/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/api/profile");
    } else {
      alert("Failed to delete task");
    }
  }
};
// My tutor and I console logged a lot of lines of code. He suggested this for the new task form to replace line 44-45. We tested it and it worked. The Create and Submit buttons went to the same place so only one is needed unless you have other plans for it.//
const newTaskForm = document.getElementById("task-form");
newTaskForm.addEventListener("submit", newFormHandler);
