// Particle.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#00f5ff', '#a855f7', '#00ffff']
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00f5ff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// Typing Animation
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = this.txt;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Animate skill bars
            if (entry.target.querySelector('.skill-bar')) {
                const skillBars = entry.target.querySelectorAll('.skill-bar');
                skillBars.forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    setTimeout(() => {
                        bar.style.width = level + '%';
                    }, 500);
                });
            }
            
            // Animate counters
            if (entry.target.querySelector('.stat-number')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    let current = 0;
                    const increment = target / 100;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, 30);
                });
            }
        }
    });
}, observerOptions);

// Observe all elements with AOS attributes
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Contact Form Validation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(error => {
        error.textContent = '';
    });
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();
    
    let isValid = true;
    
    // Validate name
    if (name === '') {
        document.getElementById('name-error').textContent = 'Name is required';
        isValid = false;
    } else if (name.length < 2) {
        document.getElementById('name-error').textContent = 'Name must be at least 2 characters';
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('email-error').textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Validate subject
    if (subject === '') {
        document.getElementById('subject-error').textContent = 'Subject is required';
        isValid = false;
    } else if (subject.length < 5) {
        document.getElementById('subject-error').textContent = 'Subject must be at least 5 characters';
        isValid = false;
    }
    
    // Validate message
    if (message === '') {
        document.getElementById('message-error').textContent = 'Message is required';
        isValid = false;
    } else if (message.length < 10) {
        document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    if (isValid) {
        const formDataObj = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        fetch('https://formspree.io/f/mojkoobv', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        })
        .then(response => {
            if (response.ok) {
                showNotification('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                // If endpoint isn't set, fallback to mailto
                window.location.href = `mailto:mithanihussain.123@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
                showNotification('Falling back to email client...', 'info');
            }
        })
        .catch(error => {
            window.location.href = `mailto:mithanihussain.123@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
            showNotification('Falling back to email client...', 'info');
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });

    } else {
        showNotification('Please fix the errors above.', 'error');
    }
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 245, 255, 0.9)' : type === 'error' ? 'rgba(255, 71, 87, 0.9)' : 'rgba(168, 85, 247, 0.9)'};
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-family: 'Rajdhani', sans-serif;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Copy Discord Username
function copyDiscord() {
    const discordUsername = 'hussain.mhk';
    navigator.clipboard.writeText(discordUsername).then(() => {
        showNotification(`Discord username "${discordUsername}" copied to clipboard!`, 'success');
    }).catch(() => {
        showNotification(`Failed to copy Discord username. Username: ${discordUsername}`, 'error');
    });
}

// Smooth Scrolling for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize Typing Animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const txtElement = document.getElementById('typing-text');
    const words = [
        'Software Developer',
        'Tech Enthusiast',
        'Problem Solver',
        'Code Architect',
        'Digital Creator',
        'Innovation Driver'
    ];
    const wait = 3000;
    
    new TypeWriter(txtElement, words, wait);
});

// Add Dynamic CSS
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }

    /* Cyberpunk Cursor Styles */
    @media (pointer: fine) {
        body, a, button, input, textarea {
            cursor: none !important;
        }
    }
    .cyber-cursor-dot {
        position: fixed;
        top: -4px;
        left: -4px;
        width: 8px;
        height: 8px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        box-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color);
        transition: transform 0.05s linear, width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease, background 0.3s ease;
    }
    .cyber-cursor-ring {
        position: fixed;
        top: -15px;
        left: -15px;
        width: 30px;
        height: 30px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 15px var(--glow-color);
        transition: width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease, border-color 0.3s ease;
    }
    .cyber-cursor-ring.hovering {
        width: 50px;
        height: 50px;
        top: -25px;
        left: -25px;
        border-color: var(--secondary-color);
        box-shadow: 0 0 20px var(--purple-glow);
        background: rgba(168, 85, 247, 0.1);
    }
    .cyber-cursor-dot.hovering {
        background: transparent;
        box-shadow: none;
    }

    /* Premium Project Card Images */
    .project-header.with-image {
        display: block;
        position: relative;
        margin-bottom: 1.5rem;
    }
    .project-image-wrapper {
        width: 100%;
        height: 200px;
        border-radius: 12px;
        overflow: hidden;
        position: relative;
        border: 1px solid var(--border-color);
        box-shadow: 0 0 15px rgba(0,0,0,0.5);
    }
    .project-image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }
    .project-card:hover .project-image-wrapper img {
        transform: scale(1.1);
    }
    .status-floating {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(10, 10, 10, 0.85);
        padding: 6px 14px;
        border-radius: 20px;
        backdrop-filter: blur(8px);
        border: 1px solid var(--border-color);
        z-index: 2;
        display: flex;
        align-items: center;
        gap: 6px;
    }
`;
document.head.appendChild(dynamicStyles);

// Advanced Cyberpunk Cursor
const cursorDot = document.createElement('div');
const cursorRing = document.createElement('div');
cursorDot.className = 'cyber-cursor-dot';
cursorRing.className = 'cyber-cursor-ring';
document.body.appendChild(cursorDot);
document.body.appendChild(cursorRing);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

const interactables = document.querySelectorAll('a, button, input, textarea, .project-card, .info-card, .skill-item');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('hovering');
        cursorDot.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('hovering');
        cursorDot.classList.remove('hovering');
    });
});

function animateRing() {
    const delay = 0.15;
    ringX += (mouseX - ringX) * delay;
    ringY += (mouseY - ringY) * delay;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animateRing);
}
animateRing();

// Add interactivity to skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0) scale(1)';
    });
});

// Add 3D effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px) rotateX(10deg)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) rotateX(0deg)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.cyber-grid');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

console.log('🚀 Mohammed Hussain Portfolio - Cyberpunk Theme Activated!');
console.log('💻 Welcome to the digital frontier...');

// Theme Toggler Dynamic Injection
const themeStyles = document.createElement('style');
themeStyles.textContent = `
    .theme-toggler {
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 15px;
        background: var(--bg-card);
        padding: 15px 10px;
        border-radius: 30px;
        border: 1px solid var(--border-color);
        z-index: 1000;
        backdrop-filter: blur(10px);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }
    .theme-btn {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid transparent;
        cursor: none;
        transition: transform 0.3s ease, border-color 0.3s ease;
        padding: 0;
    }
    .theme-btn:hover {
        transform: scale(1.2);
    }
    .theme-btn.active {
        border-color: #fff;
        transform: scale(1.2);
    }
    .theme-cyan { background: #00f5ff; box-shadow: 0 0 10px #00f5ff; }
    .theme-yellow { background: #fce205; box-shadow: 0 0 10px #fce205; }
    .theme-pink { background: #ff00ff; box-shadow: 0 0 10px #ff00ff; }
    .theme-green { background: #00ff00; box-shadow: 0 0 10px #00ff00; }

    [data-theme="yellow"] {
        --primary-color: #fce205; 
        --secondary-color: #ff003c;
        --accent-color: #fce205;
        --border-color: rgba(252, 226, 5, 0.3);
        --glow-color: rgba(252, 226, 5, 0.5);
        --purple-glow: rgba(255, 0, 60, 0.5);
    }
    [data-theme="pink"] {
        --primary-color: #ff00ff;
        --secondary-color: #00ffff;
        --accent-color: #ff00ff;
        --border-color: rgba(255, 0, 255, 0.3);
        --glow-color: rgba(255, 0, 255, 0.5);
        --purple-glow: rgba(0, 255, 255, 0.5);
    }
    [data-theme="green"] {
        --primary-color: #00ff00;
        --secondary-color: #008f11;
        --accent-color: #00ff00;
        --border-color: rgba(0, 255, 0, 0.3);
        --glow-color: rgba(0, 255, 0, 0.5);
        --purple-glow: rgba(0, 143, 17, 0.5);
    }
`;
document.head.appendChild(themeStyles);

// Theme Toggler Logic
const themeBtns = document.querySelectorAll('.theme-btn');
themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        themeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const theme = btn.getAttribute('data-theme');
        if (theme === 'cyan') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    });

    // Make sure cursor logic is applied to injected elements
    btn.addEventListener('mouseenter', () => {
        const cursorRing = document.querySelector('.cyber-cursor-ring');
        const cursorDot = document.querySelector('.cyber-cursor-dot');
        if(cursorRing) cursorRing.classList.add('hovering');
        if(cursorDot) cursorDot.classList.add('hovering');
    });
    btn.addEventListener('mouseleave', () => {
        const cursorRing = document.querySelector('.cyber-cursor-ring');
        const cursorDot = document.querySelector('.cyber-cursor-dot');
        if(cursorRing) cursorRing.classList.remove('hovering');
        if(cursorDot) cursorDot.classList.remove('hovering');
    });
});

// Terminal Typing Logic
const terminalLines = [
    "Access granted...",
    "Initializing systems...",
    "Loading core competencies...",
    "Status: All systems operational. Ready to write some code. 🚀"
];
const terminalEl = document.getElementById('terminal-text');
let terminalLine = 0;
let terminalChar = 0;

function typeTerminal() {
    if(!terminalEl) return;
    if (terminalLine < terminalLines.length) {
        if (terminalChar < terminalLines[terminalLine].length) {
            terminalEl.innerHTML += terminalLines[terminalLine].charAt(terminalChar);
            terminalChar++;
            setTimeout(typeTerminal, 50);
        } else {
            terminalEl.innerHTML += '<br>';
            terminalLine++;
            terminalChar = 0;
            setTimeout(typeTerminal, 500);
        }
    }
}

const termObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && terminalLine === 0) {
        typeTerminal();
    }
}, { threshold: 0.5 });
const termElement = document.getElementById('terminal-body');
if (termElement) termObserver.observe(termElement);
