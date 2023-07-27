const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');

const getTask = () => {
    axios.get(`api/v1/tasks/${taskId}`)
        .then(response => {
            setInitialData(response.data);
            editButtonEventListener();
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
}

const setInitialData = (task) => {
    const idText = document.querySelector('.id-text');
    const nameTextBox = document.querySelector('#name');
    const completedCheckbox = document.querySelector('#completed');

    idText.textContent = `Task ID: ${task._id}`;
    nameTextBox.value = task.name;
    completedCheckbox.checked = task.completed;
}

const editButtonEventListener = () => {
    const editBtn = document.querySelector('#edit-btn');
    editBtn.addEventListener('click', () => {
        const nameTextBox = document.querySelector('#name');
        const completedCheckbox = document.querySelector('#completed');

        axios.patch(`api/v1/tasks/${taskId}`, {
            name: nameTextBox.value, completed: completedCheckbox.checked
        })
        .then(response => {
            showPopup('Task Edited!', '#62c565');
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    });
}  

function showPopup(text, color) {
    const popup = document.querySelector('#div-popup');
    popup.innerHTML = text;
    popup.style.backgroundColor = color;
    popup.style.display = 'block';
    popup.style.textAlign = 'center';
    
    setTimeout(() => {
        popup.style.display = 'none';
    }, 1500);
}

getTask();
