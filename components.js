async function loadComponent(selector, file) {
	const el = document.querySelector(selector);
	if (!el) return;
	const res = await fetch(file);
	const html = await res.text();
	el.outerHTML = html;
}

async function initComponents() {
	await loadComponent('#nav-placeholder', '/nav.html');
	await loadComponent('#footer-placeholder', '/footer.html');
	initTheme();
	initNav();
}

function initTheme() {
	const themeToggle = document.getElementById('theme-toggle');
	if (!themeToggle) return;
	const body = document.body;

	const savedTheme = localStorage.getItem('theme') || 'light';
	body.setAttribute('data-theme', savedTheme);
	themeToggle.setAttribute('data-theme', savedTheme);

	function updateToggleState() {
		const currentTheme = body.getAttribute('data-theme');
		body.classList.toggle('dark-mode', currentTheme === 'dark');
		themeToggle.setAttribute('data-theme', currentTheme);
	}

	themeToggle.addEventListener('click', () => {
		const current = body.getAttribute('data-theme');
		const next = current === 'light' ? 'dark' : 'light';
		body.setAttribute('data-theme', next);
		themeToggle.setAttribute('data-theme', next);
		localStorage.setItem('theme', next);
		updateToggleState();
	});

	updateToggleState();
}

function initNav() {
	const navToggle = document.querySelector('.nav-toggle');
	const navLinks = document.querySelector('.nav-links');
	if (!navToggle || !navLinks) return;

	navToggle.addEventListener('click', () => {
		navLinks.classList.toggle('nav-open');
	});

	navLinks.querySelectorAll('a').forEach(link => {
		link.addEventListener('click', () => {
			navLinks.classList.remove('nav-open');
		});
	});
}

initComponents();
