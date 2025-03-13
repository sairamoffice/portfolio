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
    event.preventDefault();  

    let phoneInput = document.querySelector('input[name="phone"]');
    let phoneValue = phoneInput.value;

    let phoneRegex = /^[+]?[\d\s]{10,15}$/;
  
    if (!phoneRegex.test(phoneValue)) {
        alert("Please enter a valid phone number (with or without country code).");
        return;
    }

    let submitButton = document.querySelector(".submit-btn");
    submitButton.innerHTML = "Sending...";

    let formData = new FormData(this);

    fetch("/submit", {  // Your Flask backend route
        method: "POST",
        body: formData
    })
    .then(response => response.json())  // Parse JSON response
    .then(data => {
        if (data.success) {
            setTimeout(function() {
                document.getElementById("successMessage").style.display = "block";
                document.getElementById("successMessage").classList.add("fadeInSuccess");
                document.querySelector(".contact-form").style.display = "none";
                submitButton.innerHTML = "Message Sent!";
            }, 1000);
        } else {
            alert(data.message);  // Show error message from Flask
            submitButton.innerHTML = "Send Message";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to send message. Please try again later.");
        submitButton.innerHTML = "Send Message";
    });
});


