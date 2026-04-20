const API_URL = 'http://localhost:5000/api';
async function apiRequest(url, method = "GET", body = null, isRetry = false) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        window.location.replace('/index.html');
    }
    const res = await fetch(`${API_URL}${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: body ? JSON.stringify(body) : null
    });
    if (res.status === 401 && !isRetry) {
        const newAccessToken = await getRefreshToken();
        if (newAccessToken) {
            localStorage.setItem('accessToken', newAccessToken);
            return apiRequest(url, method, body, true);
        }
        if (!newAccessToken) {
            localStorage.removeItem('accessToken');
            window.location.href = 'index.html';
        }
    }
    return res.json();
}

async function getRefreshToken() {
    try {
        const res = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            credentials: 'include'
        })

        if (!res.ok) return null;
        const data = await res.json();
        console.log(data);

        return data.accessToken;
    } catch (error) {
        return null;
    }
}

function toastMessage(message) {
   document.getElementById('toastMessage').innerText=message;
   const toast = new bootstrap.Toast(document.getElementById('toast'));
   toast.show();
}