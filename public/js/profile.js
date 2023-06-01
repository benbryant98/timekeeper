const newFormHandler = async (event) => {
    event.preventDefault();

    const dayName = document.querySelector('#day-name').value.trim();
    const dailyTask = document.querySelector('#daily-task').value.trim();
    const weekName = document.querySelector('#week-name').value.trim();
    const weeklyTask = document.querySelector('#weekly-task').value.trim();
    const monthName = document.querySelector('#month-name').value.trim();
    const monthlyTask = document.querySelector('#monthly-task').value.trim();


    if (dayName && dailyTask) {
        const response = await fetch(`/api/tasks`, {
            method: 'POST',
            body: JSON.stringify({ dayName, dailyTask}),
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

    if (weekName && weeklyTask) {
        const response = await fetch(`/api/tasks`, {
            method: 'POST',
            body: JSON.stringify({ weekName, weeklyTask}),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            document.location.replace('/profile')
        } else {
            alert('Failed to create weekly task')
        }
    }

    if (monthName && monthlyTask) {
        const response = await fetch(`/api/tasks`, {
            method: 'POST',
            body: JSON.stringify({ monthName, monthlyTask}),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            document.location.replace('/profile')
        } else {
            alert('Failed to create monthly task')
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


