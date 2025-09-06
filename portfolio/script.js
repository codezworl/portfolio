// Neon Loader - Typewriter effect and hide
const neonLoader = document.getElementById('neonLoader');
const loaderText = document.querySelector('.loader-text');

if (neonLoader && loaderText) {
    // Typewriter effect for "Alyan Shahid"
    const text = "Alyan Shahid";
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            loaderText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100); // Type each character with 100ms delay
        } else {
            // After typing completes, wait 1 second then hide loader
            setTimeout(() => {
                neonLoader.classList.add('hidden');
                // Remove loader from DOM after animation completes
                setTimeout(() => {
                    neonLoader.remove();
                }, 500);
            }, 1000); // 1 second sleep after typing
        }
    }
    
    // Start typewriter effect
    loaderText.textContent = ""; // Clear initial "AS"
    typeWriter();
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 15, 35, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.2)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add active class styles
    const style = document.createElement('style');
    style.textContent = `
        .navbar-nav .nav-link.active {
            color: var(--primary-color) !important;
        }
        .navbar-nav .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);

    // Typing effect for hero title
    const typewriterText = document.getElementById('typewriter-text');
    if (typewriterText) {
        const phrases = [
            'I am <span class="highlight">Full Stack Developer</span>',
            'I am <span class="highlight">Designer</span>'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 80;
        let erasingDelay = 40;
        let nextPhraseDelay = 1800;
        let startDelay = 1200;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            // For typing/deleting, work with plain text length, but render HTML
            const plainText = currentPhrase.replace(/<[^>]+>/g, '');

            if (!isDeleting) {
                // Show HTML up to charIndex (counting only plain text chars)
                let display = '';
                let count = 0;
                for (let i = 0; i < currentPhrase.length && count < charIndex; i++) {
                    display += currentPhrase[i];
                    if (currentPhrase[i] !== '<') count++;
                    else while (currentPhrase[i] !== '>' && i < currentPhrase.length) display += currentPhrase[++i];
                }
                typewriterText.innerHTML = display + '|';
                if (charIndex < plainText.length) {
                    charIndex++;
                    setTimeout(type, typingDelay);
                } else {
                    setTimeout(() => { isDeleting = true; setTimeout(type, nextPhraseDelay); }, nextPhraseDelay);
                }
            } else {
                // Remove one character at a time (plain text)
                let display = '';
                let count = 0;
                for (let i = 0; i < currentPhrase.length && count < charIndex; i++) {
                    display += currentPhrase[i];
                    if (currentPhrase[i] !== '<') count++;
                    else while (currentPhrase[i] !== '>' && i < currentPhrase.length) display += currentPhrase[++i];
                }
                typewriterText.innerHTML = display + '|';
                if (charIndex > 0) {
                    charIndex--;
                    setTimeout(type, erasingDelay);
                } else {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(type, typingDelay);
                }
            }
        }

        setTimeout(type, startDelay);
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Experience card hover effects
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Portfolio item hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skill item hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Download CV button functionality
    const downloadCVBtn = document.querySelector('.download-cv');
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create download link for the actual PDF resume
            const a = document.createElement('a');
            a.href = 'resume.pdf';
            a.download = 'Alyan_Shahid_CV.pdf';
            a.type = 'application/pdf';
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            // Show success message
            showNotification('CV downloaded successfully!', 'success');
        });
    }

    // View More buttons functionality
    const viewMoreBtns = document.querySelectorAll('.btn-outline-primary');
    viewMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cardTitle = this.parentElement.querySelector('h4').textContent;
            showNotification(`Viewing details for: ${cardTitle}`, 'info');
        });
    });



    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add notification styles
        if (!document.querySelector('#notification-styles')) {
            const notificationStyles = document.createElement('style');
            notificationStyles.id = 'notification-styles';
            notificationStyles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    border-radius: 10px;
                    padding: 1rem;
                    backdrop-filter: blur(10px);
                    z-index: 1000;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                    max-width: 300px;
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--text-secondary);
                    font-size: 1.2rem;
                    cursor: pointer;
                    padding: 0;
                    margin-left: 1rem;
                }
                .notification-close:hover {
                    color: var(--primary-color);
                }
                .notification-success {
                    border-color: #10b981;
                }
                .notification-info {
                    border-color: var(--primary-color);
                }
            `;
            document.head.appendChild(notificationStyles);
        }
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
    }

    // Parallax effect for floating sigma
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const floatingSigma = document.querySelector('.floating-sigma');
        if (floatingSigma) {
            const rate = scrolled * -0.5;
            floatingSigma.style.transform = `translate(-50%, calc(-50% + ${rate}px))`;
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Mobile menu improvements
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                navbarCollapse.classList.remove('show');
                navbarToggler.classList.remove('active');
            }
        });
    }

    // Smooth reveal animation for sections
    const revealElements = document.querySelectorAll('.section');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(element => {
        element.classList.add('reveal');
        revealObserver.observe(element);
    });

    // Add reveal animation styles
    const revealStyles = document.createElement('style');
    revealStyles.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }
        .reveal.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(revealStyles);

    // Contact Form - EmailJS Implementation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Initialize EmailJS
        emailjs.init(EMAILJS_CONFIG.USER_ID);
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Show loading state
            const submitBtn = document.querySelector('.contact-submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            btnText.classList.add('d-none');
            btnLoading.classList.remove('d-none');
            submitBtn.disabled = true;
            
            // Hide any previous messages
            const contactMessage = document.getElementById('contactMessage');
            contactMessage.classList.add('d-none');
            
            // Send email using EmailJS
            emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_email: 'hafizalyan66@gmail.com' // Your email address
                }
            )
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showContactMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                showContactMessage('Failed to send message. Please try again or email me directly.', 'error');
            })
            .finally(function() {
                // Reset button state
                btnText.classList.remove('d-none');
                btnLoading.classList.add('d-none');
                submitBtn.disabled = false;
            });
            
            // Log the form data to console (for debugging)
            console.log('Contact Form Data:', formData);
        });
    }

    // Function to show contact form messages
    function showContactMessage(message, type) {
        const contactMessage = document.getElementById('contactMessage');
        contactMessage.textContent = message;
        contactMessage.className = `contact-message ${type} mt-3`;
        contactMessage.classList.remove('d-none');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            contactMessage.classList.add('d-none');
        }, 5000);
    }

    console.log('Portfolio website loaded successfully! 🚀');
});
