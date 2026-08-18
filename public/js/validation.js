/**
 * validation.js — Corral
 * Lógica de validación del lado del cliente, aislada de main.js a propósito
 * (así main.js solo se encarga de "enganchar" eventos y tocar el DOM, y
 * este archivo solo sabe de reglas: qué es un valor válido o no).
 *
 * No usa var (solo const), y usa === en vez de == en todas las comparaciones.
 */

// eslint-disable-next-line no-unused-vars -- se usa desde main.js (scripts clásicos, no módulos)
const CorralValidation = {
  /**
   * Un campo de texto es válido si, después de quitarle espacios en los
   * extremos, no queda vacío.
   */
  validateRequired(value) {
    const trimmed = value.trim();
    if (trimmed === "") {
      return { valid: false, message: "Este campo es obligatorio." };
    }
    return { valid: true, message: "" };
  },

  /**
   * Valida formato de correo con una expresión regular simple (no cubre
   * el 100% del estándar RFC de emails, pero sí los errores típicos de
   * un formulario real: falta la arroba, falta el dominio, etc.).
   */
  validateEmail(value) {
    const trimmed = value.trim();
    if (trimmed === "") {
      return { valid: false, message: "El correo es obligatorio." };
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmed)) {
      return { valid: false, message: "Ese correo no parece válido (ej: nombre@correo.com)." };
    }
    return { valid: true, message: "" };
  },

  /**
   * El número de animales es opcional, pero si el usuario escribe algo,
   * tiene que ser un número entero positivo.
   */
  validatePositiveIntegerOptional(value) {
    const trimmed = value.trim();
    if (trimmed === "") {
      return { valid: true, message: "" };
    }
    const numberValue = Number(trimmed);
    const isPositiveInteger =
      Number.isInteger(numberValue) && numberValue > 0;
    if (!isPositiveInteger) {
      return { valid: false, message: "Escribe un número entero mayor a 0." };
    }
    return { valid: true, message: "" };
  },
};
