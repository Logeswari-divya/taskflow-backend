
const APIPATH = 'http://localhost:5000/api'
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
           throw new Error(data.data.message);
        }
        console.log(data.data.accesstoken);
        localStorage.setItem('accessToken',data.data.accesstoken);
        window.location.href='dashboard.html';
    } catch (error) {
      document.getElementById('error').innerText(error.message);
    }
})
