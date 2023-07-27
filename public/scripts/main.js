const getTasks = async () => {    
    // add loading text before fetching data
    const loadingText = document.createElement('p');
    loadingText.classList.add('loading-text');
    loadingText.innerText = 'Loading...';

    const ul = document.querySelector('#ul-task');
    ul.innerHTML = ``; 
    ul.appendChild(loadingText);

    return await axios.get('api/v1/tasks')
        .then(response => {
            buildTasksList(response.data);
            deleteButtonEventListeners();
            editButtonEventListener();
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
}

const buildTasksList = (tasks) => {
    const ul = document.querySelector('#ul-task');
    ul.innerHTML = ''; // first clearing previous elements

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('card');

        const id = task._id;
        const name = task.name;
        const completed = task.completed;
        const date = new Date(task.createdAt).toLocaleString();

        li.innerHTML = `
            <div class="div-completed-text">
                <div class="completed">
                    ${ completed 
                        ? '<i class="fa-solid fa-check" style="color: #36ff5e"></i>' 
                        : '<i class="fa-solid fa-minus" style="color: #ff4f4f"></i>' }
                </div>
                <div class="task-text">${name}</div>
            </div>
            <div class="list-right-side">
                <div class="date">
                    ${date}
                </div>
                <div class="div-edit-delete">
                    <div class="task-edit">
                        <i class="fa-solid fa-pen edit-btn" data-id="${id}" style="color: #000000"></i>
                    </div>
                    <div class="task-delete">
                        <i class="fa-solid fa-trash delete-btn" data-id="${id}" style="color: #000000"></i>
                    </div>
                </div>
            </div>
        `;

        ul.appendChild(li);
    });
    
}

const addButtonEventListener = () => {
    const addButton = document.querySelector('#btn-add-task');
    const textBox = document.querySelector('#name');

    addButton.addEventListener('click', async (e) => {
        const taskName = textBox.value;

        if (taskName.length < 1) {
            showPopup('Name can\'t be empty!', '#ec714c');
            return;
        }

        if (taskName.length > 20) {
            showPopup('Name can\'t exceed 20 characters!', '#ec714c');
            return;
        }

        textBox.value = '';

        try {
            axios.post('api/v1/tasks', {
                name: taskName,
            })
            .then(response => {
                showPopup('Task Added!', '#62c565');
                getTasks();
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
        } catch (err) {
            showPopup(err, '#f75252');
        }
    });
}

const editButtonEventListener = () => {
    const editBtns = document.querySelectorAll('.edit-btn');
    editBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const dataId = btn.getAttribute('data-id');

            window.location.href = `edit.html?id=${dataId}`;
        });
    });
}

const deleteButtonEventListeners = () => {
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const dataId = btn.getAttribute('data-id');

            try {
                axios.delete(`api/v1/tasks/${dataId}`)
                    .then(response => {
                        showPopup('Task Deleted!', '#f75252');
                        getTasks();
                    })
                    .catch(error => {
                        console.error('Error:', error.message);
                    });     
            } catch (err) {
                showPopup(err, '#f75252');
            }
        });
    });
};

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

const start = async () =>  {
    await getTasks();

    addButtonEventListener();
}

start();
