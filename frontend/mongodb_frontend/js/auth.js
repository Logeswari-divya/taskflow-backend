
const APIPATH = 'http://localhost:5000/api'
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
