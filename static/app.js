const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});
// Sending email through FormSubmit when clicking Send Message
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the default form submission
  
    // Validate phone number (international support)
    let phoneInput = document.querySelector('input[name="phone"]');
    let phoneValue = phoneInput.value;
  
    // Allow +, numbers, and spaces (like: +1 9876543210 or 9876543210)
    let phoneRegex = /^[+]?[\d\s]{10,15}$/;
  
    if (!phoneRegex.test(phoneValue)) {
        alert("Please enter a valid phone number (with or without country code).");
        return;  // Stop the form submission
    }

    // Show "Sending..." text
    let submitButton = document.querySelector(".submit-btn");
    submitButton.innerHTML = "Sending...";
  
    // Get form data
    let formData = new FormData(this);

    // Send email using FormSubmit API
    fetch("https://formsubmit.co/ajax/ramsriram9858@gmail.com", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            // Delay the success message for smooth animation
            setTimeout(function() {
                // Show success message
                document.getElementById("successMessage").style.display = "block";
                document.getElementById("successMessage").classList.add("fadeInSuccess");

                // Hide the form after submission
                document.querySelector(".contact-form").style.display = "none";

                // Reset the button text
                submitButton.innerHTML = "Message Sent!";
            }, 1000);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to send message. Please try again later.");
        submitButton.innerHTML = "Send Message";
    });
});

