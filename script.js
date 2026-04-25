// document.addEventListener("DOMContentLoaded", () => {
    
//     // 1. Navigation "Contact Us" Button Functionality
//     const contactBtns = document.querySelectorAll(".nav-contact-btn");
//     contactBtns.forEach(btn => {
//         btn.addEventListener("click", () => {
//             window.location.href = "contact.html";
//         });
//     });

//     // 2. Contact Form LocalStorage Functionality
//     const contactForm = document.querySelector(".form-wrap form");
    
//     if (contactForm) {
//         contactForm.addEventListener("submit", (e) => {
//             e.preventDefault(); // Prevent the page from reloading

//             // Grab values from the input fields
//             const fullName = document.getElementById("full-name").value;
//             const email = document.getElementById("email").value;
//             const subject = document.getElementById("subject").value;
//             const message = document.getElementById("message").value;

//             // Create an object to store the query
//             const queryData = {
//                 id: Date.now(), // Unique ID based on timestamp
//                 fullName: fullName,
//                 email: email,
//                 subject: subject,
//                 message: message,
//                 date: new Date().toLocaleString()
//             };

//             // Retrieve existing queries from localStorage (or create an empty array if none exist)
//             let savedQueries = JSON.parse(localStorage.getItem("userQueries")) || [];

//             // Add the new query to the array
//             savedQueries.push(queryData);

//             // Save the updated array back to localStorage
//             localStorage.setItem("userQueries", JSON.stringify(savedQueries));

//             // Show a success message to the user
//             alert("Thank you, " + fullName + "! Your message has been saved locally.");

//             // Clear the form fields
//             contactForm.reset();
//         });
//     }

//     // 3. "Back to Top" Button Functionality
//     const backToTopBtns = document.querySelectorAll(".back-to-top");
//     backToTopBtns.forEach(btn => {
//         btn.addEventListener("click", (e) => {
//             // If the link is just "#", handle the scroll smoothly via JS
//             if (btn.getAttribute("href") === "#") {
//                 e.preventDefault();
//                 window.scrollTo({
//                     top: 0,
//                     behavior: "smooth"
//                 });
//             }
//         });
//     });

// });