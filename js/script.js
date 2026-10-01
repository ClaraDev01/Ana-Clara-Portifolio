// ── THEME ────────────────────────────────────────────────────

const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initTheme = savedTheme || (prefersDark ? 'dark' : 'light');

html.setAttribute('data-theme', initTheme);
themeToggle.checked = initTheme === 'dark';

themeToggle.addEventListener('change', () => {
    const theme = themeToggle.checked ? 'dark' : 'light';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// ── LANGUAGE ────────────────────────────────────────────────────

const langToggle = document.getElementById('language-toggle');
const langText = document.getElementById('lang-text');
let currentLang = localStorage.getItem('lang') || 'pt';

applyLang(currentLang);

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    localStorage.setItem('lang', currentLang);
    applyLang(currentLang);
});

function applyLang(lang) {
    html.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');

    langText.textContent = lang === 'pt' ? 'EN' : 'PT';

    document.title = lang === 'pt'
        ? 'Ana Clara Fonseca | Desenvolvedora Full-Stack'
        : 'Ana Clara Fonseca | Full-Stack Developer';

    document.querySelectorAll('[data-pt]').forEach(el => {
        const svg = el.querySelector('svg');
        const text = el.getAttribute(lang === 'pt' ? 'data-pt' : 'data-en');

        if (svg) {
            if (el.childNodes[0] && el.childNodes[0].nodeType === Node.TEXT_NODE) {
                el.childNodes[0].textContent = text + ' ';
            }
        } else {
            el.textContent = text;
        }
    });
}

// ── SKILLS ─────────────────────────────────────────────────────

const skillFills = document.querySelectorAll('.skill-fill');

const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.dataset.width;
            entry.target.style.width = `${width}%`;

            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

skillFills.forEach(skill => {
    skillsObserver.observe(skill);
});


// ── MENU MOBILE ───────────────────────────────────────────────

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
    });
});