'use strict';
const clock = document.getElementById('jakarta-time');
function updateClock() {
  if (clock) clock.textContent = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()) + ' WIB';
}
updateClock();
setInterval(updateClock, 60000);
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Keep native <details> semantics and a working no-JavaScript fallback.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const disclosures = [];
document.querySelectorAll('.experience-list details').forEach(details => {
  const summary = details.querySelector('summary');
  const content = details.querySelector('.detail-content');
  let animation = null;
  let expanded = details.open;
  details.dataset.expanded = String(expanded);

  function settle() {
    if (animation) {
      animation.onfinish = null;
      animation.cancel();
      animation = null;
    }
    details.open = expanded;
    details.style.height = '';
    details.style.overflow = '';
    content.inert = !expanded;
    summary.setAttribute('aria-expanded', String(expanded));
  }
  settle();
  summary.addEventListener('click', event => {
    event.preventDefault();
    // Capture the interpolated height before cancelling, allowing rapid reversal.
    const start = details.getBoundingClientRect().height;
    expanded = !expanded;
    details.dataset.expanded = String(expanded);
    summary.setAttribute('aria-expanded', String(expanded));
    if (animation) {
      animation.onfinish = null;
      animation.cancel();
      animation = null;
    }
    if (reducedMotion.matches || typeof details.animate !== 'function') {
      settle();
      return;
    }
    details.open = true;
    content.inert = !expanded;
    details.style.height = '';
    const border = parseFloat(getComputedStyle(details).borderTopWidth) + parseFloat(getComputedStyle(details).borderBottomWidth);
    const end = expanded ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height + border;
    details.style.height = `${start}px`;
    details.style.overflow = 'hidden';
    animation = details.animate([{height:`${start}px`},{height:`${end}px`}], {
      duration: 320, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards'
    });
    animation.onfinish = settle;
  });
  disclosures.push(settle);
});
// Restore natural heights after a viewport or motion-preference change.
window.addEventListener('resize', () => disclosures.forEach(settle => settle()), {passive:true});
reducedMotion.addEventListener('change', () => disclosures.forEach(settle => settle()));

const header = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('.header nav a[href^="#"]')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
let scheduled = false;
function updateNavigation() {
  scheduled = false;
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 8);
  const threshold = header.getBoundingClientRect().height + 100;
  let active = -1;
  sections.forEach((section, i) => { if (section && section.getBoundingClientRect().top <= threshold) active = i; });
  const contact = document.getElementById('contact');
  if (contact && contact.getBoundingClientRect().top <= threshold) active = -1;
  navLinks.forEach((link, i) => {
    if (i === active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
function scheduleNavigation() {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
}
window.addEventListener('scroll', scheduleNavigation, {passive:true});
window.addEventListener('resize', scheduleNavigation, {passive:true});
updateNavigation();
