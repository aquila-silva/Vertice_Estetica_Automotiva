// Controla o menu responsivo.
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  const navLinks = mainNav.querySelectorAll("a");
  const setMenuState = (isOpen) => {
    mainNav.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu" : "Abrir menu",
    );
  };

  menuToggle.addEventListener("click", () => {
    setMenuState(!mainNav.classList.contains("open"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNav.classList.contains("open")) {
      setMenuState(false);
      menuToggle.focus();
    }
  });

  navLinks.forEach((link) =>
    link.addEventListener("click", () => setMenuState(false)),
  );
}

// CTA global de WhatsApp, presente em todas as páginas públicas.
const whatsappButton = document.createElement("a");
const whatsappMessage = encodeURIComponent(
  "Olá! Gostaria de agendar uma avaliação para o meu carro.",
);
whatsappButton.className = "whatsapp-float";
whatsappButton.href = `https://wa.me/5511999999999?text=${whatsappMessage}`;
whatsappButton.target = "_blank";
whatsappButton.rel = "noopener";
whatsappButton.setAttribute("aria-label", "Falar no WhatsApp");
whatsappButton.title = "Falar no WhatsApp";
whatsappButton.innerHTML = `<svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.08 0C5.55 0 .23 5.32.23 11.86c0 2.09.55 4.13 1.59 5.93L.12 24l6.36-1.67a11.85 11.85 0 0 0 5.6 1.42h.01c6.53 0 11.85-5.32 11.85-11.86 0-3.17-1.23-6.14-3.44-8.39ZM12.09 21.7h-.01a9.85 9.85 0 0 1-5.02-1.37l-.36-.21-3.77.99 1-3.67-.23-.38a9.84 9.84 0 0 1-1.51-5.2c0-5.4 4.4-9.8 9.81-9.8a9.75 9.75 0 0 1 6.94 2.88 9.83 9.83 0 0 1 2.87 6.96c0 5.4-4.4 9.8-9.81 9.8Zm5.38-7.35c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.2-.34.22-.63.07-.29-.15-1.2-.44-2.28-1.41-.84-.75-1.41-1.68-1.58-1.96-.17-.29-.02-.44.13-.59.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49h-.54c-.19 0-.49.07-.74.37-.25.29-.98.96-.98 2.36 0 1.4 1.01 2.75 1.15 2.94.14.2 1.98 3.03 4.8 4.25.67.29 1.19.46 1.6.59.67.21 1.27.18 1.75.11.54-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.54-.34Z" /></svg><span>Fale conosco</span>`;
document.body.append(whatsappButton);

// Valida e envia o formulario para a tabela cadastros do Supabase.
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

if (contactForm && formStatus) {
  const submitButton = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Bloqueia bots que preenchem campos ocultos.
    if (contactForm.elements.website.value) return;

    const fields = {
      name: { label: "nome", min: 2, max: 80 },
      email: { label: "e-mail", max: 120 },
      phone: { label: "telefone", min: 8, max: 20 },
      service: { label: "serviço", max: 60, optional: true },
      car: { label: "carro", max: 100, optional: true },
      message: { label: "mensagem", min: 10, max: 1000 },
    };

    let isValid = true;
    let firstInvalidField = null;

    // Remove erros anteriores.
    contactForm
      .querySelectorAll(".error-message")
      .forEach((error) => error.remove());

    const consent = contactForm.elements.consent;

    if (!consent.checked) {
      const error = document.createElement("p");
      error.className = "error-message";
      error.id = "consent-error";
      error.textContent = "Autorize o uso dos dados para continuar.";

      consent.setAttribute("aria-invalid", "true");
      consent.setAttribute("aria-describedby", error.id);
      consent.parentElement.append(error);
    }

    // Validação dos campos.
    Object.entries(fields).forEach(([fieldName, rules]) => {
      const field = contactForm.elements[fieldName];
      const value = field.value.trim();
      let errorMessage = "";

      field.removeAttribute("aria-describedby");

      if (!rules.optional && !value) {
        errorMessage = `Informe seu ${rules.label}.`;
      }

      if (!errorMessage && value && rules.min && value.length < rules.min) {
        errorMessage = `O ${rules.label} deve ter pelo menos ${rules.min} caracteres.`;
      }

      if (!errorMessage && value.length > rules.max) {
        errorMessage = `O ${rules.label} deve ter no máximo ${rules.max} caracteres.`;
      }

      if (
        !errorMessage &&
        fieldName === "email" &&
        value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
      ) {
        errorMessage = "Informe um e-mail válido.";
      }

      field.setAttribute("aria-invalid", String(Boolean(errorMessage)));

      if (errorMessage) {
        isValid = false;

        if (!firstInvalidField) {
          firstInvalidField = field;
        }

        const error = document.createElement("p");
        error.className = "error-message";
        error.textContent = errorMessage;
        error.id = `${fieldName}-error`;

        field.setAttribute("aria-describedby", error.id);
        field.closest(".field").append(error);
      }
    });

    if (consent.checked) {
      consent.setAttribute("aria-invalid", "false");
      consent.removeAttribute("aria-describedby");
    }

    isValid = isValid && consent.checked;

    if (!consent.checked && !firstInvalidField) {
      firstInvalidField = consent;
    }

    // Interrompe caso exista erro de validação.
    if (!isValid) {
      formStatus.textContent = "Revise os campos destacados antes de enviar.";

      formStatus.setAttribute("role", "alert");

      firstInvalidField?.focus();

      return;
    }

    // Estado de envio.
    submitButton.disabled = true;
    submitButton.setAttribute("aria-busy", "true");
    formStatus.textContent = "Enviando mensagem...";
    formStatus.setAttribute("role", "status");

    const lead = {
      name: contactForm.elements.name.value.trim(),
      email: contactForm.elements.email.value.trim(),
      phone: contactForm.elements.phone.value.trim(),
      service: contactForm.elements.service.value.trim() || null,
      car: contactForm.elements.car.value.trim() || null,
      message: contactForm.elements.message.value.trim(),
      consent: true,
      source: "vertice-detail",
    };

    try {
      const supabase = window.UdiAutoLabSupabase?.getClient();

      if (!supabase) {
        throw new Error("Configuracao do Supabase nao encontrada");
      }

      const { error } = await supabase.from("cadastros").insert(lead);

      if (error) {
        throw error;
      }

      // Sucesso.
      formStatus.textContent = "Mensagem recebida. Em breve falamos com você.";

      contactForm.reset();

      Object.keys(fields).forEach((fieldName) => {
        const field = contactForm.elements[fieldName];

        field.setAttribute("aria-invalid", "false");
        field.removeAttribute("aria-describedby");
      });

      consent.setAttribute("aria-invalid", "false");
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);

      formStatus.textContent =
        "Não foi possível enviar sua mensagem. Tente novamente.";

      formStatus.setAttribute("role", "alert");
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute("aria-busy");
    }
  });
}

// Filtra projetos, abre imagens e controla a comparação antes/depois.
const filterButtons = document.querySelectorAll("[data-filter]");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    portfolioCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.setAttribute("aria-label", "Imagem ampliada");
lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Fechar imagem">×</button><img alt="">';
document.body.append(lightbox);

const closeLightbox = () => lightbox.classList.remove("open");
document.querySelectorAll(".lightbox-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const image = lightbox.querySelector("img");
    image.src = trigger.dataset.full;
    image.alt = trigger.querySelector("img")?.alt || "Imagem ampliada";
    lightbox.classList.add("open");
    lightbox.querySelector(".lightbox-close").focus();
  });
});
lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

document.querySelectorAll(".comparison").forEach((comparison) => {
  const range = comparison.querySelector(".comparison-range");
  const after = comparison.querySelector(".comparison-after");
  range?.addEventListener("input", () => {
    after.style.clipPath = `inset(0 0 0 ${range.value}%)`;
  });
});
