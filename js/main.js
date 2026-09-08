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
