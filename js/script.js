// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        // For now, we'll just show an alert
        alert(`Спасибо за заявку, ${formData.name}!\n\nМы свяжемся с вами в ближайшее время по телефону ${formData.phone}.`);
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to your server:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
            contactForm.reset();
        })
        .catch(error => {
            alert('Произошла ошибка. Пожалуйста, попробуйте позже или позвоните нам.');
        });
        */
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.spec-card, .equipment-card, .delivery-card, .info-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value[0] === '8') {
                value = '7' + value.slice(1);
            }
            if (value[0] !== '7') {
                value = '7' + value;
            }
        }
        
        let formatted = '+7';
        if (value.length > 1) {
            formatted += ' (' + value.substring(1, 4);
        }
        if (value.length >= 5) {
            formatted += ') ' + value.substring(4, 7);
        }
        if (value.length >= 8) {
            formatted += '-' + value.substring(7, 9);
        }
        if (value.length >= 10) {
            formatted += '-' + value.substring(9, 11);
        }
        
        e.target.value = formatted;
    });
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Discount Popup for Product Pages
const discountPopup = document.getElementById('discountPopup');
const discountMini = document.getElementById('discountMini');
const discountClose = document.getElementById('discountClose');
const discountCloseFull = document.getElementById('discountCloseFull');
const discountForm = document.getElementById('discountForm');

if (discountPopup) {
    // Check if we're on a product page
    const isProductPage = window.location.pathname.includes('/products/');
    
    if (isProductPage) {
        // Random delay between 8-9 seconds
        const delay = Math.floor(Math.random() * (9000 - 8000 + 1)) + 8000;
        
        // Always show popup after delay on product pages
        setTimeout(() => {
            discountPopup.classList.add('show');
        }, delay);
    }
    
    // Click on mini popup to expand
    discountMini.addEventListener('click', () => {
        discountPopup.classList.add('expanded');
    });
    
    // Close mini popup (X button on mini) - closes completely
    discountClose.addEventListener('click', (e) => {
        e.stopPropagation();
        discountPopup.classList.remove('show', 'expanded');
    });
    
    // Close full popup (X button on full) - closes completely
    discountCloseFull.addEventListener('click', (e) => {
        e.stopPropagation();
        discountPopup.classList.remove('show', 'expanded');
    });
    
    // Click outside full popup - collapse to mini (don't close)
    document.addEventListener('click', (e) => {
        if (discountPopup.classList.contains('expanded')) {
            // Check if click is outside the popup content
            const popupContent = discountPopup.querySelector('.discount-popup-full');
            if (popupContent && !popupContent.contains(e.target) && !discountMini.contains(e.target)) {
                // Collapse to mini instead of closing
                discountPopup.classList.remove('expanded');
            }
        }
    });
    
    // Form submission
    if (discountForm) {
        discountForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('discountName').value,
                phone: document.getElementById('discountPhone').value,
                email: document.getElementById('discountEmail').value,
                message: document.getElementById('discountMessage').value,
                type: 'discount'
            };
            
            // Here you would send data to server
            alert(`Спасибо за заявку, ${formData.name}!\n\nМы свяжемся с вами в ближайшее время и расскажем о специальном предложении.\n\nТелефон: ${formData.phone}`);
            
            // Hide popup
            discountPopup.classList.remove('show', 'expanded');
            
            // Reset form
            discountForm.reset();
            
            /* In production, use fetch:
            fetch('/api/discount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
                discountPopup.classList.remove('show', 'expanded');
                discountForm.reset();
            })
            .catch(error => {
                alert('Произошла ошибка. Пожалуйста, позвоните нам или попробуйте позже.');
            });
            */
        });
    }
}
