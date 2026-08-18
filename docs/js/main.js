/**
 * main.js — Corral
 * Interactividad de la landing page: búsqueda/filtro en tiempo real del
 * FAQ, atajo de teclado (Ctrl+K), y validación en línea del formulario
 * de contacto. Todo con addEventListener, cero handlers inline, cero
 * alert(). Depende de validation.js (debe cargarse antes que este archivo).
 */

document.addEventListener("DOMContentLoaded", () => {
  setupFaqSearch();
  setupContactFormValidation();
});

/* ------------------------------------------------------------------ */
/* Comportamiento 1: búsqueda/filtro en tiempo real sobre el FAQ       */
/* ------------------------------------------------------------------ */

function setupFaqSearch() {
  const searchInput = document.getElementById("faq-search");
  const faqItems = document.querySelectorAll("[data-faq-item]");
  const emptyMessage = document.getElementById("faq-empty");

  if (!searchInput || faqItems.length === 0) {
    return;
  }

  // Filtra en cada tecla presionada (evento "input", no solo al enviar).
  searchInput.addEventListener("input", () => {
    filterFaqItems(searchInput.value, faqItems, emptyMessage);
  });

  // Atajo de teclado no obvio: Ctrl+K (o Cmd+K en Mac) enfoca la búsqueda,
  // sin importar en qué parte de la página esté el usuario.
  document.addEventListener("keydown", (event) => {
    const isShortcut = (event.ctrlKey || event.metaKey) && event.key === "k";
    if (isShortcut) {
      event.preventDefault();
      searchInput.focus();
      searchInput.select();
    }

    // Escape limpia la búsqueda si el foco está en el input de búsqueda.
    if (event.key === "Escape" && document.activeElement === searchInput) {
      searchInput.value = "";
      filterFaqItems("", faqItems, emptyMessage);
      searchInput.blur();
    }
  });
}

function filterFaqItems(rawQuery, faqItems, emptyMessage) {
  const query = rawQuery.trim().toLowerCase();
  let visibleCount = 0;

  faqItems.forEach((item) => {
    const itemText = item.dataset.faqText || "";
    const matches = query === "" || itemText.includes(query);
    item.classList.toggle("hidden", !matches);
    if (matches) {
      visibleCount += 1;
    }
  });

  if (emptyMessage) {
    emptyMessage.classList.toggle("hidden", visibleCount !== 0);
  }
}

/* ------------------------------------------------------------------ */
/* Comportamiento 2: validación en línea del formulario de contacto    */
/* ------------------------------------------------------------------ */

function setupContactFormValidation() {
  const form = document.getElementById("contact-form");
  if (!form) {
    return;
  }

  const nombreInput = document.getElementById("nombre");
  const emailInput = document.getElementById("email");
  const cabezasInput = document.getElementById("cabezas");
  const successMessage = document.getElementById("form-success");

  const fieldsToValidate = [
    {
      input: nombreInput,
      errorId: "nombre-error",
      validate: (value) => CorralValidation.validateRequired(value),
    },
    {
      input: emailInput,
      errorId: "email-error",
      validate: (value) => CorralValidation.validateEmail(value),
    },
    {
      input: cabezasInput,
      errorId: "cabezas-error",
      validate: (value) =>
        CorralValidation.validatePositiveIntegerOptional(value),
    },
  ];

  // Valida cada campo también al salir de él (blur), no solo al enviar,
  // para que el usuario vea el error apenas comete el problema.
  fieldsToValidate.forEach((field) => {
    if (!field.input) {
      return;
    }
    field.input.addEventListener("blur", () => {
      validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (successMessage) {
      successMessage.classList.add("hidden");
    }

    const results = fieldsToValidate.map((field) => validateField(field));
    const allValid = results.every((isValid) => isValid === true);

    if (allValid) {
      if (successMessage) {
        successMessage.classList.remove("hidden");
      }
      form.reset();
    }
  });
}

function validateField(field) {
  const { input, errorId, validate } = field;
  const errorElement = document.getElementById(errorId);
  const result = validate(input.value);

  if (result.valid) {
    input.classList.remove("border-red-500");
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.add("hidden");
    }
    return true;
  }

  input.classList.add("border-red-500");
  if (errorElement) {
    errorElement.textContent = result.message;
    errorElement.classList.remove("hidden");
  }
  return false;
}