// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;
const darkModeIcon = darkModeToggle.querySelector("i");

// Function to update navbar colors based on dark mode
function updateNavbarColors() {
	const navbar = document.querySelector(".navbar");
	const isDarkMode = body.classList.contains("dark-mode");

	if (window.scrollY > 100) {
		if (isDarkMode) {
			navbar.style.background = "rgba(29, 29, 31, 0.98)";
		} else {
			navbar.style.background = "rgba(255, 255, 255, 0.98)";
		}
		navbar.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
	} else {
		if (isDarkMode) {
			navbar.style.background = "rgba(29, 29, 31, 0.72)";
		} else {
			navbar.style.background = "rgba(255, 255, 255, 0.72)";
		}
		navbar.style.boxShadow = "";
	}
}

// Check for saved dark mode preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
	body.classList.add("dark-mode");
	darkModeIcon.classList.remove("fa-moon");
	darkModeIcon.classList.add("fa-sun");
}

// Update navbar on page load
updateNavbarColors();

// Toggle dark mode
darkModeToggle.addEventListener("click", () => {
	body.classList.toggle("dark-mode");

	// Update icon
	if (body.classList.contains("dark-mode")) {
		darkModeIcon.classList.remove("fa-moon");
		darkModeIcon.classList.add("fa-sun");
		localStorage.setItem("theme", "dark");
	} else {
		darkModeIcon.classList.remove("fa-sun");
		darkModeIcon.classList.add("fa-moon");
		localStorage.setItem("theme", "light");
	}

	// Update navbar colors immediately
	updateNavbarColors();
});

// Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navClose = document.getElementById("navClose");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Open mobile menu
navToggle.addEventListener("click", () => {
	navMenu.classList.toggle("active");
	navToggle.classList.toggle("active");
});

// Close mobile menu with close button
navClose.addEventListener("click", () => {
	navMenu.classList.remove("active");
	navToggle.classList.remove("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
	link.addEventListener("click", () => {
		navMenu.classList.remove("active");
		navToggle.classList.remove("active");
	});
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute("href"));
		if (target) {
			const offset = 80;
			const targetPosition = target.offsetTop - offset;
			window.scrollTo({
				top: targetPosition,
				behavior: "smooth",
			});
		}
	});
});

// Active navigation link on scroll
window.addEventListener("scroll", () => {
	let current = "";
	const sections = document.querySelectorAll("section");

	sections.forEach((section) => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.clientHeight;
		if (scrollY >= sectionTop - 200) {
			current = section.getAttribute("id");
		}
	});

	navLinks.forEach((link) => {
		link.classList.remove("active");
		if (link.getAttribute("href") === `#${current}`) {
			link.classList.add("active");
		}
	});

	// Change navbar background on scroll
	updateNavbarColors();
});

// Contact Form Handling
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
	e.preventDefault();

	// Get form values
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const subject = document.getElementById("subject").value;
	const message = document.getElementById("message").value;

	// Here you would typically send this to a backend service
	// For now, we'll just show an alert
	alert(`Thank you for your message, ${name}! I'll get back to you soon.`);

	// Reset form
	contactForm.reset();
});

// Add typing effect to hero subtitle (optional enhancement)
function typeWriter(element, text, speed = 100) {
	let i = 0;
	element.textContent = "";

	function type() {
		if (i < text.length) {
			element.textContent += text.charAt(i);
			i++;
			setTimeout(type, speed);
		}
	}

	type();
}

// Uncomment to enable typing effect
// window.addEventListener('load', () => {
//     const subtitle = document.querySelector('.hero-subtitle');
//     const text = subtitle.textContent;
//     typeWriter(subtitle, text, 100);
// });

// Parallax effect for hero section
window.addEventListener("scroll", () => {
	const scrolled = window.pageYOffset;
	const hero = document.querySelector(".hero-content");
	if (hero) {
		hero.style.transform = `translateY(${scrolled * 0.5}px)`;
		hero.style.opacity = 1 - scrolled * 0.002;
	}
});

// Add active class to current navigation item
function setActiveNav() {
	const sections = document.querySelectorAll("section[id]");
	const navLinks = document.querySelectorAll(".nav-link");

	window.addEventListener("scroll", () => {
		let current = "";

		sections.forEach((section) => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;
			if (window.pageYOffset >= sectionTop - 200) {
				current = section.getAttribute("id");
			}
		});

		navLinks.forEach((link) => {
			link.classList.remove("active");
			if (link.getAttribute("href") === `#${current}`) {
				link.classList.add("active");
			}
		});
	});
}

setActiveNav();

// Skill items hover effect
document.querySelectorAll(".skill-item").forEach((item) => {
	item.addEventListener("mouseenter", function () {
		this.style.transform = "translateY(-5px) scale(1.05)";
	});

	item.addEventListener("mouseleave", function () {
		this.style.transform = "translateY(0) scale(1)";
	});
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
	let start = 0;
	const increment = target / (duration / 16);

	function updateCounter() {
		start += increment;
		if (start < target) {
			element.textContent = Math.floor(start) + "+";
			requestAnimationFrame(updateCounter);
		} else {
			element.textContent = target + "+";
		}
	}

	updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const statNumbers = entry.target.querySelectorAll(".stat h3");
				statNumbers.forEach((stat, index) => {
					const text = stat.textContent;
					const number = parseInt(text.replace("+", ""));
					setTimeout(() => {
						animateCounter(stat, number);
					}, index * 200);
				});
				statsObserver.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.5 }
);

const aboutStats = document.querySelector(".about-stats");
if (aboutStats) {
	statsObserver.observe(aboutStats);
}

// Form validation
const formInputs = document.querySelectorAll(".form-group input, .form-group textarea");

formInputs.forEach((input) => {
	input.addEventListener("blur", function () {
		if (this.value.trim() === "") {
			this.style.borderColor = "#ef4444";
		} else {
			this.style.borderColor = "#6366f1";
		}
	});

	input.addEventListener("focus", function () {
		this.style.borderColor = "#6366f1";
	});
});

// Scroll to top button (optional enhancement)
function createScrollToTopButton() {
	const button = document.createElement("button");
	button.innerHTML = '<i class="fas fa-arrow-up"></i>';
	button.className = "scroll-to-top";
	button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        z-index: 999;
    `;

	document.body.appendChild(button);

	window.addEventListener("scroll", () => {
		if (window.pageYOffset > 300) {
			button.style.display = "flex";
		} else {
			button.style.display = "none";
		}
	});

	button.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});

	button.addEventListener("mouseenter", () => {
		button.style.transform = "translateY(-5px)";
		button.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
	});

	button.addEventListener("mouseleave", () => {
		button.style.transform = "translateY(0)";
		button.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
	});
}

createScrollToTopButton();

console.log("Portfolio website loaded successfully!");
