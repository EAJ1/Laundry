// Keep the navigation usable with a keyboard and hide closed mobile links.
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const mobileViewport = window.matchMedia('(max-width: 768px)');
function setMenu(open) {
    navMenu.classList.toggle('active', open);
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}
hamburger.addEventListener('click', () => setMenu(hamburger.getAttribute('aria-expanded') !== 'true'));
navMenu.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        hamburger.focus();
    }
});
document.addEventListener('click', event => {
    if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) setMenu(false);
});
mobileViewport.addEventListener('change', () => setMenu(false));

// Use the system preference until the visitor explicitly selects a theme.
const themeButton = document.getElementById('theme-btn');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
let savedTheme;
try { savedTheme = localStorage.getItem('laundry-theme'); } catch { /* Storage can be unavailable. */ }
function applyTheme(dark) {
    document.body.classList.toggle('light-theme', !dark);
    themeButton.textContent = dark ? '☀️' : '🌙';
    themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
}
applyTheme(savedTheme === 'dark' || (savedTheme !== 'light' && systemTheme.matches));
themeButton.addEventListener('click', () => {
    const dark = document.body.classList.contains('light-theme');
    savedTheme = dark ? 'dark' : 'light';
    applyTheme(dark);
    try { localStorage.setItem('laundry-theme', savedTheme); } catch { /* Theme still works without persistence. */ }
});
systemTheme.addEventListener('change', event => {
    if (savedTheme !== 'dark' && savedTheme !== 'light') applyTheme(event.matches);
});

// Prepare a draft locally. Nothing is sent until the visitor sends the email.
const form = document.querySelector('.contact-form');
const draftLink = document.getElementById('email-draft');
const status = document.getElementById('form-status');
form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const body = [
        `Name: ${data.get('name')}`,
        `Reply email: ${data.get('email')}`,
        `Service: ${data.get('service')}`,
        `Suburb: ${data.get('suburb') || 'Please discuss'}`,
        `Preferred pickup date: ${data.get('pickup-date') || 'Please discuss'}`,
        '', data.get('message'), '',
        'Please confirm coverage, the quote in rand, delivery fees, and available collection and return times.'
    ].join('\n');
    draftLink.href = `mailto:hello@cleanandfresh.com?subject=${encodeURIComponent('Laundry enquiry: ' + data.get('service'))}&body=${encodeURIComponent(body)}`;
    draftLink.hidden = false;
    status.textContent = 'Your draft is ready. Select “Open email draft”, then send it from your email app. Nothing has been sent yet. If no app opens, use the email address or phone number above.';
});
form.addEventListener('input', () => {
    draftLink.hidden = true;
    draftLink.removeAttribute('href');
    status.textContent = '';
});

// Service links carry the selected service into the enquiry form.
document.querySelectorAll('[data-service]').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('service').value = link.dataset.service;
        form.dispatchEvent(new Event('input'));
    });
});
