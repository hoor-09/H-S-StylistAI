document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Home Page Script Loaded");

    // FAQ Toggle Functionality
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
});
