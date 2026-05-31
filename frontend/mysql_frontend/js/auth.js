
const APIPATH = 'https://taskflow-backend-1-fsgr.onrender.com/api'
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!email || !password) {
        alert('Please enter the email and password');
    }
    try {
        const res = await fetch(`${APIPATH}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            credentials:'include',
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if(!res.ok)
        {
           throw new Error(data.message);
        }
        console.log(data.data.accesstoken);
        localStorage.setItem('accessToken',data.data.accesstoken);
        localStorage.setItem('role',data.data.role);
        window.location.href='dashboard.html';
    } catch (error) {        
       const errElement = document.getElementById('error');
        if(errElement)
        {
            errElement.innerText=error.message;
        }
    }
})
