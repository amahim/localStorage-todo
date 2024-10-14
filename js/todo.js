const contentContainer = document.getElementById('content-container');

document.getElementById('task-btn').addEventListener('click', function() {
    const inputValue = document.getElementById('input-value');
    const inputdate = document.getElementById('input-date');
    const task = inputValue.value;
    const date = inputdate.value;
    if (task === "") {
        alert('Write Something');
    } else {
        localStorageTask(date, task);
        displayALL(date, task);
    }
});

document.getElementById('clear-btn').addEventListener('click', function() {
    contentContainer.innerHTML = ''; // Clear the content
    localStorage.clear(); // Clear localStorage
});

const localStorageTask = (date, task) => {
    const key = `${date}`;
    localStorage.setItem(key, task);
};

const displayALL = (date, task) => {
    const tr = document.createElement('tr');
    contentContainer.appendChild(tr);

    // 1
    const th1 = document.createElement('th');
    tr.appendChild(th1);
    th1.innerText = date;
    document.getElementById('input-date').value = "";

    // 2
    const th2 = document.createElement('th');
    tr.appendChild(th2);
    th2.innerText = task;
    document.getElementById('input-value').value = "";

    // 3
    const th3 = document.createElement('th');
    tr.appendChild(th3);
    const removeButton = document.createElement('button');
    removeButton.className = "p-2 rounded-full bg-red-300 text-red-500";
    removeButton.innerText = "Remove";
    removeButton.addEventListener('click', function() {
        tr.remove();
        localStorage.removeItem(date); // Remove from localStorage
    });
    th3.appendChild(removeButton);
};

// Load tasks from localStorage when the page loads
window.onload = () => {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const task = localStorage.getItem(key);
        displayALL(key, task);
    }
};
