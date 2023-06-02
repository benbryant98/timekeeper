const newFormHandler = async (event) => {
    event.preventDefault();

    const task = document.querySelector('.task').value.trim();
    const dayName = document.querySelector('#day-name').value.trim();
    const dailyTask = document.querySelector('#daily-task').value.trim();

    if (task & dayName && dailyTask) {
        const response = await fetch(`/api/tasks`, {
            method: 'POST',
            body: JSON.stringify({ task, dayName, dailyTask}),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            document.location.replace('/profile')
        } else {
            alert('Failed to create daily task')
        }
    }
};

const deleteButton = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/profile/${id}`, {
            method: 'DELETE',
        })

        if (response.ok) {
            document.location.replace('/api/profile');
        } else {
            alert('Failed to delete task')
        }
    }
};
// My tutor and I console logged a lot of lines of code. He suggested this for the new task form to replace line 44-45. We tested it and it worked. The Create and Submit buttons went to the same place so only one is needed unless you have other plans for it.//
// const newTaskForm = document.querySelector('.new-task-form')
// newTaskForm.addEventListener("submit", newFormHandler);

document.querySelector('.new-task-form')
document.addEventListener('submit', newFormHandler);

document.querySelector('.task-list')
document.addEventListener('click', newFormHandler);


