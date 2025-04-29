
// Elementos del DOM
const navBar = document.getElementById('main-nav');
const learnMoreBtn = document.getElementById('learn-more');
const burgerMenu = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');
const skillLevels = document.querySelectorAll('.skill-level');
const prevQuoteBtn = document.getElementById('prev-quote');
const nextQuoteBtn = document.getElementById('next-quote');
const quotes = document.querySelectorAll('.quote');
const contactForm = document.getElementById('contact-form');

// Variables
let currentQuoteIndex = 0;

// ==== Funciones de navegación ====
// Cambio de estilo en la navegación al hacer scroll
function handleScroll() {
    if (window.scrollY > 50) {
        navBar.classList.add('scrolled');
    } else {
        navBar.classList.remove('scrolled');
    }
}

// Toggle del menú móvil
function toggleNav() {
    // Toggle para la navegación
    navLinks.classList.toggle('nav-active');
    
    // Animación de los links
    navItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Animación del botón hamburguesa
    burgerMenu.classList.toggle('toggle');
}

// Scroll suave para los links de navegación
function smoothScroll(e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Cerrar el menú móvil si está abierto
            if (navLinks.classList.contains('nav-active')) {
                toggleNav();
            }
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    }
}

// ==== Funciones para la sección de skills ====
// Animación de las barras de habilidades
function animateSkillBars() {
    skillLevels.forEach(level => {
        const targetWidth = level.style.width;
        level.style.width = '0%';
        
        setTimeout(() => {
            level.style.width = targetWidth;
        }, 300);
    });
}

// ==== Funciones para la sección de quotes ====
// Cambiar quote actual
function showQuote(index) {
    quotes.forEach(quote => {
        quote.classList.remove('active');
    });
    
    quotes[index].classList.add('active');
    currentQuoteIndex = index;
}

// Ir a la quote siguiente
function nextQuote() {
    let nextIndex = currentQuoteIndex + 1;
    if (nextIndex >= quotes.length) {
        nextIndex = 0;
    }
    showQuote(nextIndex);
}

// Ir a la quote anterior
function prevQuote() {
    let prevIndex = currentQuoteIndex - 1;
    if (prevIndex < 0) {
        prevIndex = quotes.length - 1;
    }
    showQuote(prevIndex);
}

// ==== Funciones para efectos visuales ====
// Efecto de typing para el hero
function typeEffect(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    
    typing();
}

// Animación para las cards de proyectos
function animateOnScroll() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// ==== Funciones para el formulario de contacto ====
// Manejar envío del formulario
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Aquí normalmente enviarías los datos a un servidor
    // Por ahora, simularemos una respuesta exitosa
    
    // Deshabilitar el botón durante el "envío"
    const submitBtn = document.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simular tiempo de procesamiento
    setTimeout(() => {
        // Mostrar mensaje de éxito
        alert(`Gracias ${name}! Tu mensaje ha sido enviado correctamente.`);
        
        // Resetear el formulario
        contactForm.reset();
        
        // Restaurar el botón
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }, 1500);
}

// ==== Event Listeners ====
// Navegación y Scroll
window.addEventListener('scroll', handleScroll);
burgerMenu.addEventListener('click', toggleNav);
navLinks.addEventListener('click', smoothScroll);
document.addEventListener('scroll', animateOnScroll);

// Botón de "Descubrir más"
if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        window.scrollTo({
            top: aboutSection.offsetTop - 70,
            behavior: 'smooth'
        });
    });
}

// Controles de quotes
if (prevQuoteBtn && nextQuoteBtn) {
    prevQuoteBtn.addEventListener('click', prevQuote);
    nextQuoteBtn.addEventListener('click', nextQuote);
    
    // Cambio automático de quotes cada 5 segundos
    setInterval(nextQuote, 5000);
}

// Formulario de contacto
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

// ==== Animaciones al cargar la página ====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar las barras de habilidades
    const observerOptions = {
        threshold: 0.5
    };
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Configurar proyectos para animación en scroll
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.5s ease';
    });
    
    // Inicializar las quotes
    showQuote(0);
    
    // Animación de typing para el hero
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero h2');
    
    if (heroTitle && heroSubtitle) {
        const originalTitle = heroTitle.textContent;
        const originalSubtitle = heroSubtitle.textContent;
        
        setTimeout(() => {
            typeEffect(heroTitle, originalTitle, 100);
            
            setTimeout(() => {
                typeEffect(heroSubtitle, originalSubtitle, 80);
            }, originalTitle.length * 100 + 200);
        }, 500);
    }
});

// ==== Funciones avanzadas ====
// Modo oscuro/claro toggle
function createDarkModeToggle() {
    const footer = document.querySelector('footer .container');
    
    if (footer) {
        const toggleContainer = document.createElement('div');
        toggleContainer.classList.add('dark-mode-toggle');
        toggleContainer.style.marginTop = '20px';
        
        const toggleBtn = document.createElement('button');
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
        toggleBtn.classList.add('toggle-btn');
        toggleBtn.style.background = 'transparent';
        toggleBtn.style.border = '1px solid var(--primary-green)';
        
        let isDarkMode = true; // Por defecto ya estamos en modo oscuro
        
        toggleBtn.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            
            if (isDarkMode) {
                document.documentElement.style.setProperty('--black', '#111111');
                document.documentElement.style.setProperty('--gray', '#333333');
                document.documentElement.style.setProperty('--white', '#f5f5f5');
                toggleBtn.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
            } else {
                document.documentElement.style.setProperty('--black', '#f5f5f5');
                document.documentElement.style.setProperty('--gray', '#e0e0e0');
                document.documentElement.style.setProperty('--white', '#333333');
                toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
            }
        });
        
        toggleContainer.appendChild(toggleBtn);
        footer.appendChild(toggleContainer);
    }
}

// Crear un contador animado de estadísticas
function createStatCounter() {
    const aboutSection = document.querySelector('.about-section .container');
    
    if (aboutSection) {
        const statsContainer = document.createElement('div');
        statsContainer.classList.add('stats-container');
        statsContainer.style.display = 'flex';
        statsContainer.style.justifyContent = 'space-around';
        statsContainer.style.marginTop = '40px';
        statsContainer.style.textAlign = 'center';
        
        const stats = [
            { icon: 'fas fa-users', count: 1500, text: 'Estudiantes' },
            { icon: 'fas fa-laptop-code', count: 50, text: 'Proyectos' },
            { icon: 'fas fa-award', count: 25, text: 'Premios' },
            { icon: 'fas fa-graduation-cap', count: 200, text: 'Graduados' }
        ];
        
        stats.forEach(stat => {
            const statItem = document.createElement('div');
            statItem.classList.add('stat-item');
            
            const icon = document.createElement('i');
            icon.className = stat.icon;
            icon.style.fontSize = '2.5rem';
            icon.style.color = 'var(--primary-green)';
            icon.style.marginBottom = '10px';
            
            const counter = document.createElement('div');
            counter.classList.add('counter');
            counter.textContent = '0';
            counter.style.fontSize = '2rem';
            counter.style.fontWeight = 'bold';
            counter.setAttribute('data-target', stat.count);
            
            const text = document.createElement('div');
            text.textContent = stat.text;
            text.style.color = 'var(--light-gray)';
            
            statItem.appendChild(icon);
            statItem.appendChild(counter);
            statItem.appendChild(text);
            
            statsContainer.appendChild(statItem);
        });
        
        aboutSection.appendChild(statsContainer);
        
        // Animación de los contadores
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = document.querySelectorAll('.counter');
                    
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        const increment = target / 100;
                        let current = 0;
                        
                        const updateCounter = () => {
                            current += increment;
                            counter.textContent = Math.ceil(current);
                            
                            if (current < target) {
                                setTimeout(updateCounter, 15);
                            } else {
                                counter.textContent = target;
                            }
                        };
                        
                        updateCounter();
                    });
                    
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statObserver.observe(statsContainer);
    }
}

window.addEventListener('load', () => {
    createDarkModeToggle();
    createStatCounter();
});