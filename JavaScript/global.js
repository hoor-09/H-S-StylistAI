document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Global Script Loaded");

    // Insert Navbar into Every Page
    const navbarHTML = `
        <nav>
            <div class="logo">
                <img src="images/logo.jpeg" alt="H&S Logo">
            </div>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="dashboard.html">Dashboard</a></li>
                <li><a href="profile.html">Profile</a></li>
                <li><a href="#" class="btn" id="logoutBtn">Log Out</a></li>
            </ul>
        </nav>
    `;
    
    document.body.insertAdjacentHTML("afterbegin", navbarHTML);

    // Log Out Functionality
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.clear();
            window.location.href = "index.html";
        });
    }
});
