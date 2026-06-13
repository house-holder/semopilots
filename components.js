async function loadComponent(selector, file) {
	const el = document.querySelector(selector);
	if (!el) return;
	const res = await fetch(file);
	const html = await res.text();
	el.outerHTML = html;
}

async function initComponents() {
	await loadComponent('#hero-module', '/modules/hero.html');
	await loadComponent('#nav-module', '/modules/main-nav.html');
	await loadComponent('#learn-nav-module', '/modules/learn-nav.html');
	await loadComponent('#footer-module', '/modules/footer.html');
	initTheme();
	initNav();
	initLearnNav();
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
	const navParent = document.querySelector('nav');
	if (!navToggle || !navLinks || !navParent) return;

	function checkNavOverflow() {
		const clone = navLinks.cloneNode(true);
		clone.style.cssText = 'display:flex; visibility:hidden; position:fixed; top:0; left:0; pointer-events:none;';
		document.body.appendChild(clone);
		const overflowing = clone.scrollWidth > navParent.offsetWidth - 20;
		document.body.removeChild(clone);

		if (overflowing) {
			navParent.classList.add('nav-overflow');
		} else {
			navParent.classList.remove('nav-overflow');
			navLinks.classList.remove('nav-open');
		}
	}

	let resizeTimer;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(checkNavOverflow, 50);
	});

	requestAnimationFrame(checkNavOverflow);

	navToggle.addEventListener('click', () => {
		navLinks.classList.toggle('nav-open');
	});

	navLinks.querySelectorAll('a').forEach(link => {
		link.addEventListener('click', () => {
			navLinks.classList.remove('nav-open');
		});
	});
}

function initLearnNav() {
	const learnNav = document.querySelector('.learn-nav');
	if (!learnNav) return;
	const toggle = learnNav.querySelector('.learn-nav-toggle');
	if (!toggle) return;
	toggle.addEventListener('click', () => {
		learnNav.classList.toggle('open');
		toggle.setAttribute('aria-expanded', learnNav.classList.contains('open'));
	});
	learnNav.querySelectorAll('.learn-nav-sub-toggle').forEach(btn => {
		btn.addEventListener('click', () => {
			const sub = btn.closest('.learn-nav-sub');
			sub.classList.toggle('open');
			btn.setAttribute('aria-expanded', sub.classList.contains('open'));
		});
	});
}

initComponents();
