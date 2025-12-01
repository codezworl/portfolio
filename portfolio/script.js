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
document.addEventListener('DOMContentLoaded', function () {

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
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
        link.addEventListener('click', function (e) {
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
    window.addEventListener('scroll', function () {
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

    const observer = new IntersectionObserver(function (entries) {
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
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Portfolio item hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skill item hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Download CV button functionality
    const downloadCVBtn = document.querySelector('.download-cv');
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', function (e) {
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
        btn.addEventListener('click', function () {
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
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const floatingSigma = document.querySelector('.floating-sigma');
        if (floatingSigma) {
            const rate = scrolled * -0.5;
            floatingSigma.style.transform = `translate(-50%, calc(-50% + ${rate}px))`;
        }
    });

    // Add loading animation
    window.addEventListener('load', function () {
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
        navbarToggler.addEventListener('click', function () {
            this.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (e) {
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

        contactForm.addEventListener('submit', function (e) {
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
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showContactMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                })
                .catch(function (error) {
                    console.log('FAILED...', error);
                    showContactMessage('Failed to send message. Please try again or email me directly.', 'error');
                })
                .finally(function () {
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

    // ========== RESUME PREVIEW MODAL ==========

    // Resume Data - Based on portfolio information
    const resumePages = [
        // Page 1 - Header & Summary
        {
            content: `
                <h1>Muhammad Alyan Shahid</h1>
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>hafizalyan66@gmail.com</span>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-linkedin"></i>
                        <span>linkedin.com/in/alyan-shahid</span>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-github"></i>
                        <span>github.com/codezworl</span>
                    </div>
                </div>
                <div class="section-divider"></div>
                
                <h2>Professional Summary</h2>
                <p>Full Stack Developer with expertise in MERN stack development and modern web technologies. Currently working at TechScale, building scalable web applications using MongoDB, Express.js, React.js, and Node.js. Passionate about creating user-friendly interfaces and solving complex problems through innovative solutions.</p>
                
                <h2>Technical Skills</h2>
                <h3>Frontend Development</h3>
                <div class="skill-tags">
                    <span class="skill-tag">React.js</span>
                    <span class="skill-tag">HTML5</span>
                    <span class="skill-tag">CSS3</span>
                    <span class="skill-tag">Tailwind CSS</span>
                    <span class="skill-tag">Bootstrap</span>
                    <span class="skill-tag">JavaScript</span>
                </div>
                
                <h3>Backend Development</h3>
                <div class="skill-tags">
                    <span class="skill-tag">Node.js</span>
                    <span class="skill-tag">Express.js</span>
                    <span class="skill-tag">Python</span>
                    <span class="skill-tag">PHP</span>
                    <span class="skill-tag">Laravel</span>
                </div>
                
                <h3>Database & Tools</h3>
                <div class="skill-tags">
                    <span class="skill-tag">MongoDB</span>
                    <span class="skill-tag">SQL</span>
                    <span class="skill-tag">Git</span>
                    <span class="skill-tag">Figma</span>
                    <span class="skill-tag">Canva</span>
                </div>
            `
        },
        // Page 2 - Experience
        {
            content: `
                <h2>Work Experience</h2>
                
                <div class="experience-item">
                    <h3>MERN Stack Developer</h3>
                    <h4>TechScale</h4>
                    <p class="date-range">August 2024 - Present</p>
                    <ul>
                        <li>Developing scalable web applications using MongoDB, Express.js, React.js, and Node.js</li>
                        <li>Implementing responsive user interfaces with modern design principles</li>
                        <li>Collaborating with cross-functional teams to deliver high-quality solutions</li>
                        <li>Optimizing application performance and user experience</li>
                    </ul>
                </div>
                
                <div class="experience-item">
                    <h3>Front End Engineer</h3>
                    <h4>Social Swirl</h4>
                    <p class="date-range">June 2024 - September 2024 (3 months)</p>
                    <ul>
                        <li>Built responsive web interfaces using React.js and JavaScript</li>
                        <li>Implemented modern UI/UX designs with attention to detail</li>
                        <li>Ensured cross-browser compatibility and mobile responsiveness</li>
                        <li>Collaborated with designers to translate mockups into functional interfaces</li>
                    </ul>
                </div>
                
                <div class="experience-item">
                    <h3>Web Developer Intern</h3>
                    <h4>Codemo</h4>
                    <p class="date-range">June 2023 - August 2023 (2 months)</p>
                    <ul>
                        <li>Assisted in creating dynamic websites with HTML, CSS, JavaScript, and PHP</li>
                        <li>Learned best practices in web development and coding standards</li>
                        <li>Contributed to multiple client projects under senior developer guidance</li>
                    </ul>
                </div>
            `
        },
        // Page 3 - More Experience & Education
        {
            content: `
                <h2>Additional Experience</h2>
                
                <div class="experience-item">
                    <h3>Co-Ambassador</h3>
                    <h4>Fast Softec</h4>
                    <p class="date-range">January 2024 - August 2024 (8 months)</p>
                    <ul>
                        <li>Promoted tech events and engaged students in workshops</li>
                        <li>Organized and coordinated technical events and competitions</li>
                        <li>Built community connections and fostered tech enthusiasm</li>
                    </ul>
                </div>
                
                <div class="experience-item">
                    <h3>Python Trainee</h3>
                    <h4>Digicon Valley</h4>
                    <p class="date-range">April 2024 - May 2024 (1 month)</p>
                    <ul>
                        <li>Practiced Python for data handling and problem-solving</li>
                        <li>Developed understanding of Python frameworks and libraries</li>
                    </ul>
                </div>
                
                <div class="section-divider"></div>
                
                <h2>Education</h2>
                
                <div class="education-item">
                    <h3>Bachelor of Computer Science</h3>
                    <h4>Riphah International University</h4>
                    <p class="date-range">2021 - 2025</p>
                    <p>Studied computer science with focus on software engineering and web development. Gained comprehensive knowledge in data structures, algorithms, and modern development practices.</p>
                </div>
                
                <div class="education-item">
                    <h3>FSc Pre-Engineering</h3>
                    <h4>Punjab College</h4>
                    <p class="date-range">2018 - 2020</p>
                    <p>Completed intermediate studies with major knowledge of Mathematics and Physics.</p>
                </div>
            `
        },
        // Page 4 - Certifications & Projects
        {
            content: `
                <h2>Certifications</h2>
                
                <div class="education-item">
                    <h3>Cisco JavaScript Essentials 2</h3>
                    <h4>Cisco</h4>
                    <p>Professional Certification in JavaScript programming</p>
                </div>
                
                <div class="education-item">
                    <h3>AWS Academy Cloud Architecting</h3>
                    <h4>AWS Academy</h4>
                    <p>Cloud Architecture Graduate certification</p>
                </div>
                
                <div class="education-item">
                    <h3>Introduction to Cybersecurity</h3>
                    <h4>Cisco</h4>
                    <p>Cybersecurity Foundation certification</p>
                </div>
                
                <div class="education-item">
                    <h3>Business Model Innovation</h3>
                    <h4>Coursera</h4>
                    <p>Business Strategy certification</p>
                </div>
                
                <div class="section-divider"></div>
                
                <h2>Featured Projects</h2>
                
                <div class="experience-item">
                    <h3>UnityStack - MERN Stack Platform</h3>
                    <p>A student community platform with project sharing, live sessions (WebRTC), and real-time chat (WebSocket.io). Built with React, Node.js, MongoDB, and modern web technologies.</p>
                </div>
                
                <div class="experience-item">
                    <h3>SpamShield - AI Spam Detection</h3>
                    <p>Advanced spam detection system powered by AI algorithms. Detects financial scams, urgency tactics, and suspicious patterns using machine learning.</p>
                </div>
                
                <div class="experience-item">
                    <h3>Shadow Runner - Platformer Game</h3>
                    <p>Epic platformer adventure game built with JavaScript and HTML5 Canvas. Features smooth controls, obstacle navigation, and checkpoint systems.</p>
                </div>
            `
        }
    ];

    // Modal Elements
    const resumeModal = document.getElementById('resumeModal');
    const previewResumeBtn = document.getElementById('previewResumeBtn');
    const closeResumeModalBtn = document.getElementById('closeResumeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const leftPageContent = document.getElementById('leftPageContent');
    const rightPageContent = document.getElementById('rightPageContent');
    const leftPageNumber = document.getElementById('leftPageNumber');
    const rightPageNumber = document.getElementById('rightPageNumber');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageNumSpan = document.getElementById('currentPageNum');
    const totalPagesSpan = document.getElementById('totalPages');

    // State
    let currentPage = 0;
    const isMobile = window.innerWidth <= 1200;

    // Initialize total pages
    if (totalPagesSpan) {
        totalPagesSpan.textContent = resumePages.length;
    }

    // Open Modal
    if (previewResumeBtn) {
        previewResumeBtn.addEventListener('click', function () {
            currentPage = 0;
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            renderPages();
            updateControls();
        });
    }

    // Close Modal
    function closeModal() {
        resumeModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    if (closeResumeModalBtn) {
        closeResumeModalBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Render Pages
    function renderPages() {
        if (!leftPageContent || !rightPageContent) return;

        // Add flip-out animation first
        const leftPage = document.querySelector('.resume-page-left');
        const rightPage = document.querySelector('.resume-page-right');

        if (leftPage) {
            leftPage.style.animation = 'pageFlipOut 0.4s ease-out';
        }
        if (rightPage && !isMobile) {
            rightPage.style.animation = 'pageFlipOut 0.4s ease-out';
        }

        // Wait for flip-out animation, then update content and flip-in
        setTimeout(() => {
            if (isMobile) {
                // Mobile: Show one page at a time
                leftPageContent.innerHTML = resumePages[currentPage].content;
                if (leftPageNumber) {
                    leftPageNumber.textContent = `Page ${currentPage + 1}`;
                }
            } else {
                // Desktop: Show two pages (book style)
                leftPageContent.innerHTML = resumePages[currentPage].content;
                if (leftPageNumber) {
                    leftPageNumber.textContent = `Page ${currentPage + 1}`;
                }

                if (currentPage + 1 < resumePages.length) {
                    rightPageContent.innerHTML = resumePages[currentPage + 1].content;
                    if (rightPageNumber) {
                        rightPageNumber.textContent = `Page ${currentPage + 2}`;
                    }
                } else {
                    rightPageContent.innerHTML = '<div style="text-align: center; padding: 3rem; color: #a0aec0;"><i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem; color: var(--primary-color);"></i><h3 style="color: #4a5568;">End of Resume</h3><p style="color: #718096;">Thank you for viewing!</p></div>';
                    if (rightPageNumber) {
                        rightPageNumber.textContent = '';
                    }
                }
            }

            // Apply flip-in animation
            if (leftPage) {
                leftPage.style.animation = 'pageFlipIn 0.5s ease-in';
            }
            if (rightPage && !isMobile) {
                rightPage.style.animation = 'pageFlipIn 0.5s ease-in';
            }
        }, 400);
    }

    // Update Controls
    function updateControls() {
        if (!currentPageNumSpan) return;
        currentPageNumSpan.textContent = currentPage + 1;
    }

    // Add click handlers to pages for navigation
    if (leftPageContent) {
        leftPageContent.parentElement.addEventListener('click', function (e) {
            if (isMobile) {
                // On mobile, clicking the single page goes to next
                const maxPage = resumePages.length - 1;
                if (currentPage < maxPage) {
                    currentPage += 1;
                    renderPages();
                    updateControls();
                }
            } else {
                // On desktop, click on left page = go to previous
                if (currentPage > 0) {
                    currentPage -= 2;
                    if (currentPage < 0) currentPage = 0;
                    renderPages();
                    updateControls();
                }
            }
        });
        leftPageContent.parentElement.style.cursor = 'pointer';
    }

    if (rightPageContent) {
        rightPageContent.parentElement.addEventListener('click', function (e) {
            // Click on right page = go to next (desktop only)
            const maxPage = resumePages.length - 2;
            if (currentPage < maxPage) {
                currentPage += 2;
                renderPages();
                updateControls();
            }
        });
        rightPageContent.parentElement.style.cursor = 'pointer';
    }

    // Keyboard Navigation for Modal
    document.addEventListener('keydown', function (e) {
        if (!resumeModal.classList.contains('active')) return;

        if (e.key === 'ArrowLeft' && currentPage > 0) {
            currentPage -= isMobile ? 1 : 2;
            if (currentPage < 0) currentPage = 0;
            renderPages();
            updateControls();
        } else if (e.key === 'ArrowRight') {
            const maxPage = isMobile ? resumePages.length - 1 : resumePages.length - 2;
            if (currentPage < maxPage) {
                currentPage += isMobile ? 1 : 2;
                renderPages();
                updateControls();
            }
        }
    });
});
