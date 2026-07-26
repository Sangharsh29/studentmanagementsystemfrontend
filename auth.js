const BASE_URL = "https://studentmanagementsystem-kbv3.onrender.com";

function checkSession() {
    fetch(BASE_URL + "/api/auth/check", {
        method: "GET",
        credentials: "include"
    })
    .then(res => res.text())
    .then(status => {
        if (status !== "LOGGED_IN") {
            window.location.replace("index.html");
        }
    })
    .catch(() => {
        window.location.replace("index.html");
    });
}

function logout() {
    fetch(BASE_URL + "/api/auth/logout", {
        method: "POST",
        credentials: "include"
    })
    .then(() => {
        window.location.replace("index.html");
    });
}