
document.addEventListener('DOMContentLoaded', async (e) => {
    loadProjects();
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', logout);
});

async function logout() {
    const res = await apiRequest('/auth/logout', 'DELETE');
    if (res.success) {
        localStorage.clear();
        toastMessage(res.data.message);
        window.location.replace = '/index.html';
        window.location.reload();
    }
}

async function loadProjects() {
    const res = await apiRequest('/projects');
    const ul = document.getElementById('projectList');
    ul.innerHTML = '';
    const projects = res.data;
    projects.forEach((project) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        const span = document.createElement('span');
        span.innerText = project.name;
        span.style.cursor = 'pointer';
        span.addEventListener('click', () => {
            currentPage = 1;
            isLoading = false;
            hasMoreData = true;
            loadTasks(project.id);
        })
        const buttonGroup = document.createElement('div');
        const editBtn = document.createElement('button');
        buttonGroup.classList.add('d-flex');
        editBtn.classList.add('btn', 'btn-sm', 'button-light', 'me-2');
        editBtn.innerHTML = '<i class="fa fa-pen"></i>';
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openProjectEditModal(project);
        })
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-sm', 'btn-light', 'text-danger');
        deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteProject(project.id)
        })
        buttonGroup.appendChild(editBtn);
        buttonGroup.appendChild(deleteBtn);
        li.appendChild(span);
        li.appendChild(buttonGroup);
        ul.appendChild(li);
    });
}
async function deleteProject(projectId) {
    if (confirm('Are you sure to delete the project?')) {
        await apiRequest(`/projects/${projectId}`, 'DELETE');
        toastMessage('Project deleted successfully!..');
    }
}
async function editProject(projectId, name) {
    const newProjectName = prompt('Enter project Name', name);
    if (!newProjectName || newProjectName.trim() == '') return;
    await apiRequest(`/projects/${projectId}`, 'PATCH', { name: newProjectName });
    loadProjects();
}
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        if (hasMoreData && !isLoading) {
            currentPage++;
            const project_id = document.getElementById('project_id').value;
            loadTasks(project_id, currentPage);
        }
    }
})
async function loadTasks(projectId, page = 1) {
    if (isLoading || !hasMoreData) return;

    isLoading = true;
    const res = await apiRequest(`/projects/${projectId}/tasks/getTask?page=${page}&limit=5`);
    const taskList = document.getElementById('taskList');

    const tasks = res.data.result;
    if (page == 1) {
        taskList.innerHTML = '';
        hasMoreData = true;
    }
    if (tasks.length == 0) {
        hasMoreData = false;
        if (page == 0) {
            taskList.innerHTML += `<div class='d-flex h-100 w-100 text-danger align-items-center justify-content-center'>No Records Found!.</div>`;
            isLoading = false;
            return;
        }
    }
    const project_id = document.getElementById('project_id');
    project_id.value = projectId;
    tasks.forEach((task) => {
        taskList.innerHTML += `<div class='card p-3 mt-2'>
            <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
            <h2 class="">${task.title}</h2>
            <div class="d-flex align-items-center gap-2">
            <select class="form-select form-select-sm task-status-dropdown" name="taskStatus" data-id='${task.id}'>
            <option value="pending" ${task.status == 'pending' ? 'selected' : ''}>pending</option>
            <option value="in_progress" ${task.status == 'in_progress' ? 'selected' : ''}>In Progress</option>
            <option value="completed" ${task.status == 'completed' ? 'selected' : ''}>Completed</option>
            </select>
            </div>
            </div>
            <div>
            <p class="text-muted mb-3">${task.description}</p>
            
            </div>
           <div class="d-flex justify-content-between">
           <div>
           <button class='btn btn-sm btn-outline-info comments-toggle-btn' data-id="${task.id}">Show Comments</button>
           </div>
            <div class="gap-2">
            <button class="btn btn-secondary edit-btn"  data-id="${task.id}" data-description="${task.description}"
                data-status="${task.status}" data-title="${task.title}">Edit</button>
            <button class="btn btn-danger delete-btn"  data-id=${task.id}>Delete</button>
            </div>
            </div>
            <div class="comment-container d-none mt-3" id="comments-${task.id}">
            </div>
        </div>`;
    });
    isLoading = false;
}
function openProjectEditModal(project) {
    document.getElementById('projectName').value = project.name;
    document.getElementById('projectDesc').value = project.description;
    document.getElementById('projectId').value = project.id;
    const modalEl = document.getElementById('addProjectModal');
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
}
document.addEventListener('DOMContentLoaded', async (e) => {
    const addProject = document.getElementById('addProjectForm');
    addProject.addEventListener('submit', async (e) => {
        e.preventDefault();
        const isValid = true;
        const projectId = document.getElementById('projectId').value;
        const projectNameEle = document.getElementById('projectName');
        const projectDescEle = document.getElementById('projectDesc');
        const projectName = projectNameEle.value;
        const projectDesc = projectDescEle.value;
        [projectNameEle, projectDescEle].forEach((e) => {
            e.classList.remove('is-invalid');
        })
        if (projectName.trim()) {
            projectNameEle.classList.add('is-invalid');
        }
        if (projectDesc.trim()) {
            projectDescEle.classList.add('is-valid');
        }
        let res;
        if (projectId) {
            res = await apiRequest(`/projects/${projectId}/`, 'PATCH', { name: projectName, description: projectDesc });
        } else {
            res = await apiRequest('/projects', 'POST', { name: projectName, description: projectDesc });
        }
        const result = res.data.message;
        const modalEl = document.getElementById('addProjectModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
        addProject.reset();
        loadProjects();
    });
    const addTask = document.getElementById('addTask');
    addTask.addEventListener('submit', async (e) => {
        e.preventDefault();
        const isValid = true;
        const taskTitleEle = document.getElementById('taskTitle');
        const taskDescriptionEle = document.getElementById('taskDescription');
        const taskStatusEle = document.getElementById('taskStatus');
        const taskTitle = taskTitleEle.value;
        const taskDescription = taskDescriptionEle.value;
        const taskStatus = taskStatusEle.value;
        [taskTitleEle, taskDescriptionEle, taskStatusEle].forEach((el) => {
            el.classList.remove('is-invalid');
        });

        const id = document.getElementById('taskId').value;
        const currentProjectId = document.getElementById('project_id').value;
        let res;
        if (!taskTitle.trim()) {
            taskTitleEle.classList.add('is-invalid');
            isValid = false;
        }
        if (!taskDescription.trim()) {
            taskDescriptionEle.classList.add('is-invalid');
            isValid = false;
        }
        if (!taskStatus.trim()) {
            taskStatusEle.classList.add('is-invalid');
            isValid = false;
        }
        if (!isValid) return;
        if (id) {
            res = await apiRequest(`/projects/${currentProjectId}/tasks/${id}`, 'PUT', { title: taskTitle, description: taskDescription, status: taskStatus });
        } else {
            res = await apiRequest(`/projects/${currentProjectId}/tasks`, 'POST', { title: taskTitle, description: taskDescription }); console.log(res);
        }
        const result = res.data.message;
        const modalEl = document.getElementById('addTaskModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
        addTask.reset();
        loadTasks(currentProjectId);
    })

    const taskListData = document.getElementById('taskList');
    taskListData.addEventListener('click', async (e) => {
        e.preventDefault();
        const editBtn = e.target.closest('.edit-btn');
        if (editBtn) {
            const modalEl = document.getElementById('addTaskModal');
            const modal = new bootstrap.Modal(modalEl);
            const currentProjectId = document.getElementById('project_id').value;
            const taskdata = await apiRequest(`/projects/${currentProjectId}/tasks/${e.target.dataset.id}`, 'GET');
            document.querySelector('.modal-title').innerText = "Edit Task";
            document.getElementById('taskId').value = e.target.dataset.id;
            document.getElementById('taskTitle').value = taskdata.data[0].title;
            document.getElementById('taskDescription').value = taskdata.data[0].description;
            document.getElementById('taskStatus').value = taskdata.data[0].status;
            modal.show();
        }
        const deletebtn = e.target.closest('.delete-btn');
        if (deletebtn) {
            const taskId = e.target.getAttribute('data-id');
            const res = await apiRequest(`/tasks/${taskId}`, 'DELETE');
            const currentProjectId = document.getElementById('project_id').value;
            loadTasks(currentProjectId);
        }
        const comments_btn = e.target.closest('.comments-toggle-btn');
        if (comments_btn) {
            const taskId = comments_btn.dataset.id;
            const container = document.getElementById(`comments-${taskId}`);
            if (!container.classList.contains('d-none')) {
                container.classList.add('d-none');
                return;
            }
            container.classList.remove('d-none');
            await loadComments(taskId);

        }
        if (e.target.classList.contains('add-comment-btn')) {
            const taskId = e.target.dataset.id;
            const input = document.getElementById(`new-comment-${taskId}`);
            const text = input.value.trim();
            if (!text) return toastMessage('Enter comment');
            await apiRequest(`/tasks/${taskId}/comment`, 'POST', { comment: text });
            await loadComments(taskId);
        }
        if (e.target.classList.contains('delete-comment-btn')) {
            const parent = e.target.closest('[id^="comments-"]');
            const taskId = parent.id.split('-')[1];
            const commentId = e.target.dataset.id;
            if (!confirm('Are you sure delete this comment')) return;
            await apiRequest(`/tasks/${taskId}/comment/${commentId}`, 'DELETE');
            await loadComments(taskId);

        }

        if (e.target.classList.contains('edit-comment-btn')) {
            const commentId = e.target.dataset.id;
            const parent = document.getElementById(`comment-${commentId}`);
            parent.querySelector('.save-comment-btn').classList.remove('d-none');
            parent.querySelector('.edit-comment-input').classList.remove('d-none');
            parent.querySelector('.comment-text').classList.add('d-none');
            e.target.classList.add('d-none');
        }
        if (e.target.classList.contains('save-comment-btn')) {
            const commentId = e.target.dataset.id;
            const parent = document.getElementById(`comment-${commentId}`);
            const newText = parent.querySelector('.edit-comment-input').value.trim();
            if (!newText) return toastMessage('Comment cannot be empty!...');
            const parentCommentTaskId = e.target.closest('[id^="comments-"]');
            const taskId = parentCommentTaskId.id.split('-')[1];
            await apiRequest(`/tasks/${taskId}/comment/${commentId}`, 'PUT', { comment: newText, commentId });
            parent.querySelector('.save-comment-btn').classList.add('d-none');
            parent.querySelector('.edit-comment-input').classList.add('d-none');
            parent.querySelector('.comment-text').classList.remove('d-none');
            parent.querySelector('.comment-text').innerText = newText;
            parent.querySelector('.edit-comment-btn').classList.remove('d-none');
        }
        if (e.target.classList.contains('task-status-dropdown')) {
            const taskId = e.target.dataset.id;
            const newStatus = e.target.value;
            await apiRequest(`/tasks/${taskId}/status`, 'PATCH', { taskId, status: newStatus });
            e.target.classList.add('border-success');
            setTimeout(() => {
                e.target.classList.remove('border-success');
            }, 8000);
        }
    })

    document.querySelector('[data-bs-target="#addTaskModal"]').addEventListener('click', (e) => {
        document.querySelector('.modal-title').innerText = 'Add Task';
        addTask.reset();
        document.getElementById('taskId').value = "";
    })

})

async function loadComments(taskId) {
    const container = document.getElementById(`comments-${taskId}`);
    container.innerHTML = '';
    const res = await apiRequest(`/tasks/${taskId}/comment`, 'GET');
    const comments = res.data;
    container.innerHTML += `<div class='border rouded p-2 mb-2'>
                <input type="text" class="form-control my-3" id="new-comment-${taskId}" placeholder = "write comment here..">
                <button class="btn btn-sm btn-success add-comment-btn" data-id="${taskId}" >Add Comment</button>
            </div>`
    comments.forEach((comment) => {
        container.innerHTML += `<div class='border rounded p-2 mb-2' id="comment-${comment.id}">
    <small class="text-muted">${comment.created_at || ''}</small>
    <p class="comment-text mb-0">${comment.comment}</p>
    <input type="text" class="form-control mb-2 d-none edit-comment-input" name="edit_input" value="${comment.comment}">
    <div class="mt-2">
    <button class="btn btn-sm btn-outline-primary edit-comment-btn" data-id="${comment.id}">Edit</button>
    <button class="btn btn-sm btn-outline-success save-comment-btn d-none" data-id="${comment.id}">Save</button>
    <button class="btn btn-sm btn-outline-danger delete-comment-btn" data-id="${comment.id}">Delete</button>
    </div>`;
    })
}
