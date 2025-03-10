// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const sidebarLinks = document.querySelectorAll(".sidebar a");
    const sections = document.querySelectorAll(".dashboard-section");
    const uploadInput = document.getElementById("uploadInput");
    const closetGallery = document.getElementById("closetGallery");
    const matchButton = document.getElementById("findMatchesBtn");
    const matchResults = document.getElementById("matchResults"); //  Fix: Declare matchResults

    function showSection(sectionId) {
        sections.forEach(section => section.style.display = "none");
        const activeSection = document.getElementById(sectionId);
        if (activeSection) activeSection.style.display = "block";
    }

    //  Check if redirected from signup (URL contains ?section=preferences)
    const urlParams = new URLSearchParams(window.location.search);
    const sectionParam = urlParams.get("section");

    // Remove "active" class from all sidebar links before adding the correct one
    sidebarLinks.forEach(link => link.classList.remove("active"));

    const savePreferencesBtn = document.getElementById("savePreferencesBtn");
    
    if (savePreferencesBtn) {
        savePreferencesBtn.addEventListener("click", function () {
            // Get selected gender
            let selectedGender = document.querySelector('input[name="gender"]:checked')?.value;
            let selectedClothingType = document.getElementById("clothingType")?.value;
            let selectedSeason = document.getElementById("favoriteSeason")?.value;
            let selectedOccasion = document.getElementById("favoriteOccasion")?.value;

            // Get selected colors (Array)
            let selectedColors = [];
            document.querySelectorAll('.color-selection input:checked').forEach(color => {
                selectedColors.push(color.value);
            });

            if (!selectedGender || !selectedClothingType || !selectedSeason || !selectedOccasion || selectedColors.length === 0) {
                alert("⚠️ Please select all preferences before saving!");
                return;
            }

            // Save preferences to localStorage
            localStorage.setItem("selectedGender", selectedGender);
            localStorage.setItem("selectedClothingType", selectedClothingType);
            localStorage.setItem("selectedSeason", selectedSeason);
            localStorage.setItem("selectedOccasion", selectedOccasion);
            localStorage.setItem("selectedColors", JSON.stringify(selectedColors));

            alert("Preferences saved successfully!");

            // Redirect to Virtual Closet
            window.location.href = "dashboard.html?section=closet";
        });
    }

    // Restore Preferences on Page Load
    function restorePreferences() {
        let savedGender = localStorage.getItem("selectedGender");
        let savedClothingType = localStorage.getItem("selectedClothingType");
        let savedSeason = localStorage.getItem("selectedSeason");
        let savedOccasion = localStorage.getItem("selectedOccasion");
        let savedColors = JSON.parse(localStorage.getItem("selectedColors")) || [];

        if (savedGender) {
            document.querySelector(`input[name="gender"][value="${savedGender}"]`).checked = true;
        }
        if (savedClothingType) {
            document.getElementById("clothingType").value = savedClothingType;
        }
        if (savedSeason) {
            document.getElementById("favoriteSeason").value = savedSeason;
        }
        if (savedOccasion) {
            document.getElementById("favoriteOccasion").value = savedOccasion;
        }
        savedColors.forEach(color => {
            document.getElementById(color).checked = true;
        });
    }

    restorePreferences();


    if (sectionParam && document.getElementById(sectionParam)) {
        showSection(sectionParam);
        document.querySelector(`[data-section="${sectionParam}"]`)?.classList.add("active");
    } else {
        showSection("closet");
        document.querySelector('[data-section="closet"]')?.classList.add("active");
    }


    sidebarLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            sidebarLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");
            showSection(this.getAttribute("data-section"));
        });
    });

    //  Gender selection redirects to Virtual Closet
    const savedGender = localStorage.getItem("selectedGender");
    
    if (savedGender) {
        let genderRadio = document.querySelector(`input[name="gender"][value="${savedGender}"]`);
        if (genderRadio) {
            genderRadio.checked = true;
            console.log(` Gender Restored: ${savedGender}`);
        }
    }

    document.querySelectorAll('input[name="gender"]').forEach((radio) => {
        radio.addEventListener("change", function () {
            localStorage.setItem("selectedGender", this.value);
            console.log("Gender selected but no redirection");
        });
    });
    
    // Ensure gender is loaded when the page opens
    document.addEventListener("DOMContentLoaded", function () {
        const savedGender = localStorage.getItem("selectedGender");
        if (savedGender) {
            let genderRadio = document.querySelector(`input[name="gender"][value="${savedGender}"]`);
            if (genderRadio) genderRadio.checked = true; //  Restore selection
        }
    });
    

    //  Closet Image Upload & Local Storage Handling
    function loadClosetImages() {
        const storedImages = JSON.parse(localStorage.getItem("closetImages")) || [];
        closetGallery.innerHTML = ""; // Clear before adding stored images

        storedImages.forEach(imgSrc => {
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("closet-item");

            const img = document.createElement("img");
            img.src = imgSrc;
            img.alt = "Uploaded Outfit";

            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "x";
            deleteBtn.classList.add("delete-btn");

            deleteBtn.addEventListener("click", function () {
                imageContainer.remove();
                removeImageFromStorage(imgSrc);
            });

            imageContainer.appendChild(img);
            imageContainer.appendChild(deleteBtn);
            closetGallery.appendChild(imageContainer);
        });
    }

    function removeImageFromStorage(imageSrc) {
        let storedImages = JSON.parse(localStorage.getItem("closetImages")) || [];
        storedImages = storedImages.filter(src => src !== imageSrc);
        localStorage.setItem("closetImages", JSON.stringify(storedImages));
    }

    function storeImage(imageSrc) {
        let storedImages = JSON.parse(localStorage.getItem("closetImages")) || [];
        storedImages.push(imageSrc);
        localStorage.setItem("closetImages", JSON.stringify(storedImages));
    }

    if (uploadInput) {
        uploadInput.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    storeImage(e.target.result);
                    loadClosetImages();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    //  Load stored images on page load
    loadClosetImages();

    //  Function to find matches
    function findMatches() {
        console.log(" Finding matches...");

        let selectedGender = document.querySelector('input[name="gender"]:checked')?.value;
        console.log(" Gender Detected:", selectedGender);

        if (!selectedGender) {
            alert(" Please select your gender in the Preferences section before finding matches.");
            return;
        }
        let selectedType = document.getElementById("formality")?.value;
        let selectedSeason = document.getElementById("season")?.value;
        let selectedOccasion = document.getElementById("occasion")?.value;

        console.log(" Selected Filters:", {
            gender: selectedGender,
            type: selectedType,
            season: selectedSeason,
            occasion: selectedOccasion
        });

        if (!selectedType || !selectedSeason || !selectedOccasion) {
            alert(" Please select all outfit preferences.");
            return;
        }

        matchResults.innerHTML = ""; //  Fix: Clear previous results properly
    
    const images = {
        female: {
            casual: {
                autumn: {
                    work: ["images/female-casual-autumn-work1.jpg", "images/female-casual-autumn-work2.jpg"],
                    wedding: ["images/female-casual-autumn-wedding1.jpg", "images/female-casual-autumn-wedding2.jpg"],
                    date_night: ["images/female-casual-autumn-date1.jpg", "images/female-casual-autumn-date2.jpg"],
                    casual_outing: ["images/female-casual-autumn-outing1.jpg", "images/female-casual-autumn-outing2.jpg"]
                },
                winter: {
                    work: ["images/female-casual-winter-work1.jpg", "images/female-casual-winter-work2.jpg"],
                    wedding: ["images/female-casual-winter-wedding1.jpg", "images/female-casual-winter-wedding2.jpg"],
                    date_night: ["images/female-casual-winter-date1.jpg", "images/female-casual-winter-date2.jpg"],
                    casual_outing: ["images/female-casual-winter-outing1.jpg", "images/female-casual-winter-outing2.jpg"]
                },
                summer: {
                    work: ["images/female-casual-summer-work1.jpg", "images/female-casual-summer-work2.jpg"],
                    wedding: ["images/female-casual-summer-wedding1.jpg", "images/female-casual-summer-wedding2.jpg"],
                    date_night: ["images/female-casual-summer-date1.jpg", "images/female-casual-summer-date2.jpg"],
                    casual_outing: ["images/female-casual-summer-outing1.jpg", "images/female-casual-summer-outing2.jpg"]
                },
                spring: {
                    work: ["images/female-casual-spring-work1.jpg", "images/female-casual-spring-work2.jpg"],
                    wedding: ["images/female-casual-spring-wedding1.jpg", "images/female-casual-spring-wedding2.jpg"],
                    date_night: ["images/female-casual-spring-date1.jpg", "images/female-casual-spring-date2.jpg"],
                    casual_outing: ["images/female-casual-spring-outing1.jpg", "images/female-casual-spring-outing2.jpg"]
                }
            },
            formal: {
                autumn: {
                    work: ["images/female-formal-autumn-work1.jpg", "images/female-formal-autumn-work2.jpg"],
                    wedding: ["images/female-formal-autumn-wedding1.jpg", "images/female-formal-autumn-wedding2.jpg"],
                    date_night: ["images/female-formal-autumn-date1.jpg", "images/female-formal-autumn-date2.jpg"],
                    casual_outing: ["images/female-formal-autumn-outing1.jpg", "images/female-formal-autumn-outing2.jpg"]
                },
                winter: {
                    work: ["images/female-formal-winter-work1.jpg", "images/female-formal-winter-work2.jpg"],
                    wedding: ["images/female-formal-winter-wedding1.jpg", "images/female-formal-winter-wedding2.jpg"],
                    date_night: ["images/female-formal-winter-date1.jpg", "images/female-formal-winter-date2.jpg"],
                    casual_outing: ["images/female-formal-winter-outing1.jpg", "images/female-formal-winter-outing2.jpg"]
                },
                summer: {
                    work: ["images/female-formal-summer-work1.jpg", "images/female-formal-summer-work2.jpg"],
                    wedding: ["images/female-formal-summer-wedding1.jpg", "images/female-formal-summer-wedding2.jpg"],
                    date_night: ["images/female-formal-summer-date1.jpg", "images/female-formal-summer-date2.jpg"],
                    casual_outing: ["images/female-formal-summer-outing1.jpg", "images/female-formal-summer-outing2.jpg"]
                },
                spring: {
                    work: ["images/female-formal-spring-work1.jpg", "images/female-formal-spring-work2.jpg"],
                    wedding: ["images/female-formal-spring-wedding1.jpg", "images/female-formal-spring-wedding2.jpg"],
                    date_night: ["images/female-formal-spring-date1.jpg", "images/female-formal-spring-date2.jpg"],
                    casual_outing: ["images/female-formal-spring-outing1.jpg", "images/female-formal-spring-outing2.jpg"]
                }
            }
        },        
        male: {
            casual: {
                autumn: {
                    work: ["images/male-casual-autumn-work1.jpg", "images/male-casual-autumn-work2.jpg"],
                    wedding: ["images/male-casual-autumn-wedding1.jpg", "images/male-casual-autumn-wedding2.jpg"],
                    date_night: ["images/male-casual-autumn-date1.jpg", "images/male-casual-autumn-date2.jpg"],
                    casual_outing: ["images/male-casual-autumn-outing1.jpg", "images/male-casual-autumn-outing2.jpg"]
                },
                winter: {
                    work: ["images/male-casual-winter-work1.jpg", "images/male-casual-winter-work2.jpg"],
                    wedding: ["images/male-casual-winter-wedding1.jpg", "images/male-casual-winter-wedding2.jpg"],
                    date_night: ["images/male-casual-winter-date1.jpg", "images/male-casual-winter-date2.jpg"],
                    casual_outing: ["images/male-casual-winter-outing1.jpg", "images/male-casual-winter-outing2.jpg"]
                },
                summer: {
                    work: ["images/male-casual-summer-work1.jpg", "images/male-casual-summer-work2.jpg"],
                    wedding: ["images/male-casual-summer-wedding1.jpg", "images/male-casual-summer-wedding2.jpg"],
                    date_night: ["images/male-casual-summer-date1.jpg", "images/male-casual-summer-date2.jpg"],
                    casual_outing: ["images/male-casual-summer-outing1.jpg", "images/male-casual-summer-outing2.jpg"]
                },
                spring: {
                    work: ["images/male-casual-spring-work1.jpg", "images/male-casual-spring-work2.jpg"],
                    wedding: ["images/male-casual-spring-wedding1.jpg", "images/male-casual-spring-wedding2.jpg"],
                    date_night: ["images/male-casual-spring-date1.jpg", "images/male-casual-spring-date2.jpg"],
                    casual_outing: ["images/male-casual-spring-outing1.jpg", "images/male-casual-spring-outing2.jpg"]
                }
            },
            formal: {
                autumn: {
                    work: ["images/male-formal-autumn-work1.jpg", "images/male-formal-autumn-work2.jpg"],
                    wedding: ["images/male-formal-autumn-wedding1.jpg", "images/male-formal-autumn-wedding2.jpg"],
                    date_night: ["images/male-formal-autumn-date1.jpg", "images/male-formal-autumn-date2.jpg"],
                    casual_outing: ["images/male-formal-autumn-outing1.jpg", "images/male-formal-autumn-outing2.jpg"]
                },
                winter: {
                    work: ["images/male-formal-winter-work1.jpg", "images/male-formal-winter-work2.jpg"],
                    wedding: ["images/male-formal-winter-wedding1.jpg", "images/male-formal-winter-wedding2.jpg"],
                    date_night: ["images/male-formal-winter-date1.jpg", "images/male-formal-winter-date2.jpg"],
                    casual_outing: ["images/male-formal-winter-outing1.jpg", "images/male-formal-winter-outing2.jpg"]
                },
                summer: {
                    work: ["images/male-formal-summer-work1.jpg", "images/male-formal-summer-work2.jpg"],
                    wedding: ["images/male-formal-summer-wedding1.jpg", "images/male-formal-summer-wedding2.jpg"],
                    date_night: ["images/male-formal-summer-date1.jpg", "images/male-formal-summer-date2.jpg"],
                    casual_outing: ["images/male-formal-summer-outing1.jpg", "images/male-formal-summer-outing2.jpg"]
                },
                spring: {
                    work: ["images/male-formal-spring-work1.jpg", "images/male-formal-spring-work2.jpg"],
                    wedding: ["images/male-formal-spring-wedding1.jpg", "images/male-formal-spring-wedding2.jpg"],
                    date_night: ["images/male-formal-spring-date1.jpg", "images/male-formal-spring-date2.jpg"],
                    casual_outing: ["images/male-formal-spring-outing1.jpg", "images/male-formal-spring-outing2.jpg"]
                }
            }
        }
        
    };
    
    let selectedImages = images[selectedGender]?.[selectedType]?.[selectedSeason]?.[selectedOccasion] || [];

        if (selectedImages.length > 0) {
            selectedImages.forEach(imgSrc => {
                let img = document.createElement("img");
                img.src = imgSrc;
                img.alt = "Suggested Outfit";
                img.classList.add("outfit-image");
                matchResults.appendChild(img);
            });
        } else {
            matchResults.innerHTML = "<p> No matches found.</p>";
        }
    }

    // Attach event listener to Find Matches button
    if (matchButton) {
        console.log(" Find Matches button detected!");
        matchButton.addEventListener("click", findMatches);
    } else {
        console.error(" Find Matches button NOT found!");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logoutBtn");
    
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            //  Clear stored data
            localStorage.clear();
            sessionStorage.clear();

            //  Redirect to the homepage (index.html)
            window.location.href = "/H-S-StylistAI/index.html";  // Adjust if needed
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default page reload

            // Simulate login success
            console.log(" Login successful!");

            // Redirect to Preferences Setup after login
            window.location.href = "dashboard.html?section=preferences";
        });
    } else {
        console.error(" Login form NOT found!");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const refreshBtn = document.getElementById("refreshRecommendations");
    const outfitImages = document.querySelectorAll(".outfit");
    const loadingText = document.getElementById("loading");

    if (!refreshBtn || outfitImages.length === 0 || !loadingText) {
        console.error("AI Recommendations section not found!");
        return;
    }

    const outfitPaths = [
        "images/outfit1.jpg", "images/outfit2.jpg", "images/outfit3.jpg",
        "images/outfit4.jpg", "images/outfit5.jpg", "images/outfit6.jpg"
    ];

    refreshBtn.addEventListener("click", function () {
        // Show loading animation
        loadingText.style.display = "block";
        outfitImages.forEach(img => img.style.opacity = "0"); // Hide images

        setTimeout(() => {
            // Change outfits
            outfitImages.forEach(img => {
                const randomIndex = Math.floor(Math.random() * outfitPaths.length);
                img.src = outfitPaths[randomIndex];
                img.style.opacity = "1"; // Show images again
            });

            // Hide loading animation
            loadingText.style.display = "none";
        }, 1500); // Delay for realism
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const editPreferencesBtn = document.getElementById("editPreferences");
    const changePasswordBtn = document.getElementById("changePassword");
    const deleteAccountBtn = document.getElementById("deleteAccount");
    const darkModeToggle = document.getElementById("darkModeToggle");

    // Redirect to Preferences Section
    editPreferencesBtn.addEventListener("click", function () {
        const preferencesSection = document.getElementById("preferences");
        
        if (preferencesSection) {
            preferencesSection.scrollIntoView({ behavior: "smooth" });
        } else {
            console.error("Preferences section not found!");
        }
    });


    // Change Password Placeholder
    changePasswordBtn.addEventListener("click", function () {
        alert("Change Password feature will be added soon!");
    });

    // Delete Account Confirmation
    deleteAccountBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            alert("Account deletion is currently not available.");
        }
    });

    // Dark Mode Toggle (Future Feature)
    darkModeToggle.addEventListener("click", function () {
        alert("Dark mode will be added in future updates!");
    });
});
