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

document.querySelector('.new-task-form')
document.addEventListener('submit', newFormHandler);

document.querySelector('.task-list')
document.addEventListener('click', newFormHandler);


