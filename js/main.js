const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
	menuToggle.addEventListener('click', () => {
		const isOpen = mainNav.classList.toggle('open');
		menuToggle.setAttribute('aria-expanded', isOpen);
	});
}

const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');

if (contactForm && formStatus) {
	contactForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const fields = {
			name: { label: 'nome', min: 2, max: 80 },
			email: { label: 'e-mail', max: 120 },
			car: { label: 'carro', max: 100, optional: true },
			message: { label: 'mensagem', min: 10, max: 1000 }
		};
		let isValid = true;

		contactForm.querySelectorAll('.error-message').forEach((error) => error.remove());
		Object.entries(fields).forEach(([fieldName, rules]) => {
			const field = contactForm.elements[fieldName];
			const value = field.value.trim();
			let errorMessage = '';

			if (!rules.optional && !value) errorMessage = `Informe seu ${rules.label}.`;
			if (!errorMessage && value && rules.min && value.length < rules.min) errorMessage = `O ${rules.label} deve ter pelo menos ${rules.min} caracteres.`;
			if (!errorMessage && value.length > rules.max) errorMessage = `O ${rules.label} deve ter no máximo ${rules.max} caracteres.`;
			if (!errorMessage && fieldName === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) errorMessage = 'Informe um e-mail válido.';

			field.setAttribute('aria-invalid', String(Boolean(errorMessage)));
			if (errorMessage) {
				isValid = false;
				const error = document.createElement('p');
				error.className = 'error-message';
				error.textContent = errorMessage;
				error.id = `${fieldName}-error`;
				field.setAttribute('aria-describedby', error.id);
				field.closest('.field').append(error);
			}
		});

		if (!isValid) {
			formStatus.textContent = 'Revise os campos destacados antes de enviar.';
			formStatus.setAttribute('role', 'alert');
			return;
		}

		formStatus.textContent = 'Mensagem recebida. Em breve falamos com você.';
		formStatus.setAttribute('role', 'status');
		contactForm.reset();
		Object.keys(fields).forEach((fieldName) => {
			const field = contactForm.elements[fieldName];
			field.setAttribute('aria-invalid', 'false');
			field.removeAttribute('aria-describedby');
		});
	});
}
