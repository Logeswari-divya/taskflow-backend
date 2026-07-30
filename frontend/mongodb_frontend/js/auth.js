
const APIPATH = 'https://taskflow-backend-23db.onrender.com/api'
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;
    const emailEle = document.getElementById('email');
    const passwordEle = document.getElementById('password');
    const email = emailEle.value;
    const password = passwordEle.value;
    [emailEle, passwordEle].forEach((item) => {
        item.classList.remove('is-invalid');
    })
    if (!email) {
        emailEle.classList.add('is-invalid');
        isValid = false;
    }
    if (!password) {
        passwordEle.classList.add('is-invalid');
        isValid = false;
    }
    if(!isValid) return;
    try {
        const res = await fetch(`${APIPATH}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        console.log(data);
        
        if (!res.ok) {
            throw new Error(data.message);
        }

        localStorage.setItem('accessToken', data.data.accesstoken);
        localStorage.setItem('role', data.data.role);
        window.location.href = 'dashboard.html';
    } catch (error) {        
        const errElement = document.getElementById('error');
        if(errElement)
        {
            errElement.innerText=error.message;
        }
    }
})


const addUserbtn = document.getElementById('createNewUser');
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
        email, role, name, password
    }

    try {
        const res = await fetch(`${APIPATH}/auth/register`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({ email, password, name, role })
        });
        const data = await res.json();
        if (!res.ok) {
            const modalEl = document.getElementById('newUserAccountModel');
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();
            throw new Error(data.message);
        }
        console.log(data.data.accesstoken);
        localStorage.setItem('accessToken', data.data.accesstoken);
        localStorage.setItem('role', data.data.role);
        window.location.href = 'dashboard.html';
    } catch (error) {
        const errElement = document.getElementById('error');
        if (errElement) {
            errElement.innerText = error.message;
        }
    }
})
