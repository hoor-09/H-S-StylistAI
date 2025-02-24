document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script Loaded"); // Debugging Step


    const wrapper = document.querySelector('.wrapper');
    const signUpLink = document.querySelector('.signUp-link');
    const signInLink = document.querySelector('.signIn-link');
    
    if (signUpLink && signInLink && wrapper) {
        signUpLink.addEventListener('click', () => {
            wrapper.classList.add('animate-signIn');
            wrapper.classList.remove('animate-signUp');
        });

        signInLink.addEventListener('click', () => {
            wrapper.classList.add('animate-signUp');
            wrapper.classList.remove('animate-signIn');
        });
    } else {
        console.warn("⚠️ Sign-up or Sign-in link not found.");
    }


    // =================== FAQ Toggle ===================
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = question.querySelector(".faq-icon");

        question.addEventListener("click", function () {
            if (answer.style.maxHeight && answer.style.maxHeight !== "0px") {
                answer.style.maxHeight = "0px"; // Close it
                question.classList.remove("open");
                icon.style.transform = "rotate(0deg)";
            } else {
                document.querySelectorAll(".faq-answer").forEach(ans => ans.style.maxHeight = "0px");
                document.querySelectorAll(".faq-question").forEach(q => q.classList.remove("open"));

                answer.style.maxHeight = answer.scrollHeight + "px"; 
                question.classList.add("open");
                icon.style.transform = "rotate(180deg)";
            }
        });

        answer.style.maxHeight = "0px"; // Ensure all answers are initially hidden
    });

    // =================== Virtual Closet (Image Upload with Delete) ===================
    const imageUpload = document.getElementById("imageUpload");
    const closetGallery = document.getElementById("closet-gallery");

    if (imageUpload) {
        imageUpload.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imageContainer = document.createElement("div");
                    imageContainer.classList.add("closet-item");

                    const imgElement = document.createElement("img");
                    imgElement.src = e.target.result;

                    const deleteBtn = document.createElement("button");
                    deleteBtn.innerText = "X";
                    deleteBtn.classList.add("delete-btn");
                    deleteBtn.onclick = function () {
                        closetGallery.removeChild(imageContainer);
                    };

                    imageContainer.appendChild(imgElement);
                    imageContainer.appendChild(deleteBtn);
                    closetGallery.appendChild(imageContainer);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // =================== AI Outfit Recommendation (Now with Multiple Images) ===================
    const outfitContainer = document.getElementById("outfit-container");
    const selectedGender = localStorage.getItem("selectedGender");
    const userStyle = localStorage.getItem("userStyle") || "casual"; // Default to casual
    const seasonFilter = document.getElementById("seasonFilter");

    if (outfitContainer && seasonFilter) {
        // Outfit Data Based on Gender, Style & Season
        const outfits = {
            male: {
                casual: {
                    summer: [
                        { img: "images/male-casual-summer1.jpg", shopLink: "#" },
                        { img: "images/male-casual-summer2.jpg", shopLink: "#" },
                        { img: "images/male-casual-summer3.jpg", shopLink: "#" }
                    ],
                    winter: [
                        { img: "images/male-casual-winter1.jpg", shopLink: "#" },
                        { img: "images/male-casual-winter2.jpg", shopLink: "#" },
                        { img: "images/male-casual-winter3.jpg", shopLink: "#" }
                    ],
                    spring: [
                        { img: "images/male-casual-spring1.jpg", shopLink: "#" },
                        { img: "images/male-casual-spring2.jpg", shopLink: "#" }
                    ],
                    autumn: [
                        { img: "images/male-casual-autumn1.jpg", shopLink: "#" },
                        { img: "images/male-casual-autumn2.jpg", shopLink: "#" }
                    ]
                },
                formal: {
                    summer: [
                        { img: "images/male-formal-summer1.jpg", shopLink: "#" },
                        { img: "images/male-formal-summer2.jpg", shopLink: "#" }
                    ],
                    winter: [
                        { img: "images/male-formal-winter1.jpg", shopLink: "#" },
                        { img: "images/male-formal-winter2.jpg", shopLink: "#" }
                    ],
                    spring: [
                        { img: "images/male-formal-spring1.jpg", shopLink: "#" },
                        { img: "images/male-formal-spring2.jpg", shopLink: "#" }
                    ],
                    autumn: [
                        { img: "images/male-formal-autumn1.jpg", shopLink: "#" },
                        { img: "images/male-formal-autumn2.jpg", shopLink: "#" }
                    ]
                }
            },
            female: {
                casual: {
                    summer: [
                        { img: "images/female-casual-summer1.jpg", shopLink: "#" },
                        { img: "images/female-casual-summer2.jpg", shopLink: "#" }
                    ],
                    winter: [
                        { img: "images/female-casual-winter1.jpg", shopLink: "#" },
                        { img: "images/female-casual-winter2.jpg", shopLink: "#" }
                    ],
                    spring: [
                        { img: "images/female-casual-spring1.jpg", shopLink: "#" },
                        { img: "images/female-casual-spring2.jpg", shopLink: "#" }
                    ],
                    autumn: [
                        { img: "images/female-casual-autumn1.jpg", shopLink: "#" },
                        { img: "images/female-casual-autumn2.jpg", shopLink: "#" }
                    ]
                },
                formal: {
                    summer: [
                        { img: "images/female-formal-summer1.jpg", shopLink: "#" },
                        { img: "images/female-formal-summer2.jpg", shopLink: "#" },
                        { img: "images/female-formal-summer3.jpg", shopLink: "#" },
                        { img: "images/female-formal-summer4.jpg", shopLink: "#" }
                    ],
                    winter: [
                        { img: "images/female-formal-winter1.jpg", shopLink: "#" },
                        { img: "images/female-formal-winter2.jpg", shopLink: "#" },
                        { img: "images/female-formal-winter3.jpg", shopLink: "#" },
                        { img: "images/female-formal-winter4.jpg", shopLink: "#" }
                    ],
                    spring: [
                        { img: "images/female-formal-spring1.jpg", shopLink: "#" },
                        { img: "images/female-formal-spring2.jpg", shopLink: "#" },
                        { img: "images/female-formal-spring3.jpg", shopLink: "#" }
                    ],
                    autumn: [
                        { img: "images/female-formal-autumn1.jpg", shopLink: "#" },
                        { img: "images/female-formal-autumn2.jpg", shopLink: "#" },
                        { img: "images/female-formal-autumn3.jpg", shopLink: "#" }
                    ]
                }
            }
        };

            
        // Function to Update Outfits
        function updateOutfits() {
            const selectedSeason = seasonFilter.value;
            outfitContainer.innerHTML = ""; // Clear previous outfits

            let selectedOutfits = outfits[selectedGender]?.[userStyle]?.[selectedSeason] || [];

            selectedOutfits.forEach(outfit => {
                const outfitDiv = document.createElement("div");
                outfitDiv.classList.add("outfit-item");

                const outfitImg = document.createElement("img");
                outfitImg.src = outfit.img;

                const shopBtn = document.createElement("a");
                shopBtn.href = outfit.shopLink;
                shopBtn.classList.add("shop-btn");
                shopBtn.innerText = "Shop This Look";

                outfitDiv.appendChild(outfitImg);
                outfitDiv.appendChild(shopBtn);
                outfitContainer.appendChild(outfitDiv);
            });
        }

        // Load outfits when page loads
        updateOutfits();

        // Update outfits when season is changed
        seasonFilter.addEventListener("change", updateOutfits);
    }

    // =================== User Flow (Welcome → Virtual Closet → Outfits) ===================
    const welcomeMessage = document.getElementById("welcome-message");
    const startClosetBtn = document.getElementById("startCloset");
    const virtualCloset = document.getElementById("virtual-closet");
    const goToOutfitsBtn = document.getElementById("goToOutfits");
    const outfitRecommendations = document.getElementById("outfit-recommendations");

    if (welcomeMessage && virtualCloset) {
        virtualCloset.style.display = "none";
        outfitRecommendations.style.display = "none";

        startClosetBtn.addEventListener("click", function () {
            welcomeMessage.style.display = "none";
            virtualCloset.style.display = "block";
        });
    }

    if (goToOutfitsBtn && outfitRecommendations) {
        goToOutfitsBtn.style.display = "none";

        imageUpload.addEventListener("change", function () {
            goToOutfitsBtn.style.display = "block";
        });

        goToOutfitsBtn.addEventListener("click", function () {
            virtualCloset.style.display = "none";
            outfitRecommendations.style.display = "block";
        });
    }

    // =================== Log Out Function ===================
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.clear();
            window.location.href = "index.html";
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script Loaded Successfully");

    // =================== Wardrobe Upload Functionality ===================
    const imageUpload = document.getElementById("imageUpload");
    const closetGallery = document.getElementById("closet-gallery");

    // Load saved images from localStorage on page load
    let storedImages = JSON.parse(localStorage.getItem("wardrobe")) || [];

    function displayWardrobe() {
        closetGallery.innerHTML = ""; // Clear previous images

        storedImages.forEach((imageSrc, index) => {
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("closet-item");

            const imgElement = document.createElement("img");
            imgElement.src = imageSrc;

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "X";
            deleteBtn.classList.add("delete-btn");

            deleteBtn.onclick = function () {
                storedImages.splice(index, 1); // Remove from array
                localStorage.setItem("wardrobe", JSON.stringify(storedImages)); // Update storage
                displayWardrobe(); // Refresh display
            };

            imageContainer.appendChild(imgElement);
            imageContainer.appendChild(deleteBtn);
            closetGallery.appendChild(imageContainer);
        });
    }

    // Display wardrobe on page load
    displayWardrobe();

    // Handle new image uploads
    if (imageUpload) {
        imageUpload.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    storedImages.push(e.target.result);
                    localStorage.setItem("wardrobe", JSON.stringify(storedImages));
                    displayWardrobe();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // =================== Preferences Selection ===================
    const stylePreference = document.getElementById("stylePreference");
    const saveProfile = document.getElementById("saveProfile");

    // Load saved preferences from localStorage
    const savedStyle = localStorage.getItem("userStyle");
    if (savedStyle) {
        stylePreference.value = savedStyle;
    }

    if (saveProfile) {
        saveProfile.addEventListener("click", function () {
            const selectedStyle = stylePreference.value;
            localStorage.setItem("userStyle", selectedStyle);
            alert("Preferences Saved!");
        });
    }

    // =================== Log Out Function ===================
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.clear();
            window.location.href = "index.html";
        });
    }
});
