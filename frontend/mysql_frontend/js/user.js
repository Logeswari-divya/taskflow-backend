let currentPage = 1;
let currentSearch='';
let totalPages=1;
const limit=5;
async function loadUsers(page=1,currentSearch='') {
     currentPage = page;
    let limit=5;
    const res = await apiRequest(`/user?page=${page}&limit=${limit}&search=${currentSearch}`, 'GET');
    const table = document.getElementById('userDataTable');
    table.innerHTML = '';
    const users = res.data.result.data;
    const total =res.data.result.countResult[0].total;
    totalPages = res.data.result.totalPages;
    users.forEach(user => {
        table.innerHTML += `
        <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td><button class='btn btn-primary edit-user-btn' data-user="${encodeURIComponent(JSON.stringify(user))}" data-id=${user.id}">Edit</button>
        <button class='btn btn-danger delete-user-btn' data-id=${user.id}>Delete</button></td>
        </tr>
        `;
    });
    renderPagination()
}
let timer='';
document.getElementById('searchInput').addEventListener('keyup',(e)=>{
    e.preventDefault();
    clearTimeout(timer);
    timer = setTimeout(() => {
        const currentSearch = e.target.value;
        loadUsers(1,currentSearch);
    }, 500);
})
document.getElementById('userDataTable').addEventListener('click', async(e) => {
    e.preventDefault();
    if (e.target.classList.contains('edit-user-btn')) {
        const btn = e.target;
        const user = JSON.parse(decodeURIComponent(btn.dataset.user));
        editUserModalData(user);

    }
    if (e.target.classList.contains('delete-user-btn')) {
        const btn = e.target;
        const userId = btn.dataset.id;
        const res =await apiRequest(`/user/${userId}`,'DELETE');
        if(res.success)
        {
            toastMessage(res.data.message);
            loadUsers();
        }
    }
})
function renderPagination(){
const pagination = document.getElementById('pagination');
pagination.innerHTML='';
pagination.innerHTML+=`<li class="page-item ${currentPage===1 ? 'disabled':' ' }"><button class="page-link"  onclick="loadUsers(${currentPage-1})">Prev</button></li>`;
for(let i=1;i<=totalPages;i++){
   pagination.innerHTML += `<li class="page-item ${currentPage===i ? 'active':''}"><button class="page-link"  onclick="loadUsers(${i})">${i}</button></li>`;
}

pagination.innerHTML +=`<li class="page-item  ${currentPage==totalPages ? 'disabled':''}"><button class="page-link" onclick="${currentPage<totalPages?`loadUsers(${currentPage+1})`:''}">Next</button></li>`;
}
function editUserModalData(user) {
    const modalEl = document.getElementById('addUserModal');
    const modal = new bootstrap.Modal(modalEl);
    document.getElementById('userId').value = user.id;
    document.getElementById('userName').value = user.name;
    document.getElementById('userPassword').value = '';
    document.getElementById('userRole').value = user.role;
    document.getElementById('userEmail').value = user.email;
    modal.show();
}
const addUserbtn = document.getElementById('addUser');
addUserbtn.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;
    const nameEle = document.getElementById('userName');
    const passwordEle = document.getElementById('userPassword');
    const roleEle = document.getElementById('userRole');
    const emailEle = document.getElementById('userEmail');
    const email = emailEle.value;
    const password = passwordEle.value;
    const role = roleEle.value;
    const name = nameEle.value;
    const userId = document.getElementById('userId').value;
    [roleEle, emailEle, passwordEle, nameEle].forEach((element) => {
        element.classList.remove('is-invalid');
    });
    if (!email.trim()) {
        isValid = false;
        emailEle.classList.add('is-invalid');
    }
    if (!role.trim()) {
        isValid = false;
        roleEle.classList.add('is-invalid');
    }
    if (!password.trim() && userId == '') {
        isValid = false;
        passwordEle.classList.add('is-invalid');
    }
    if (!name.trim()) {
        isValid = false;
        nameEle.classList.add('is-invalid');
    }
    if (!isValid) return;

    let res;
    let userData = {
        email, role, name
    }
    if (password) {
        userData.password = password;
    }
    if (userId) {
        res = await apiRequest(`/user/${userId}`, 'PUT', userData);
    } else {
        res = await apiRequest('/user', 'POST', userData);
    }
    if (res.success) {
        const modalEl = document.getElementById('addUserModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
        addUserbtn.reset();
        document.getElementById('userId').value='';
        loadUsers();
    }

})
loadUsers();