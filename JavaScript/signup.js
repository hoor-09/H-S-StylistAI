const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

// function redirectToPreferences(event) {
//     event.preventDefault(); // Prevent page from refreshing

//     // Simulate successful signup (replace with backend logic if needed)
//     setTimeout(() => {
//         window.location.href = "dashboard.html?section=preferences"; // Redirect to Preferences Section
//     }, 500);
// }

document.addEventListener("DOMContentLoaded", function () {
    console.log(" Signup Script Loaded");

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); //  Stop form from reloading the page
            console.log(" Login form submitted!");

            // Simulate login success (You can replace this with actual login logic)
            localStorage.setItem("userLoggedIn", "true");

            // Redirect to Preferences Setup after login
            window.location.href = "dashboard.html?section=preferences";
        });
    } else {
        console.error(" Login form NOT found!");
    }
});
