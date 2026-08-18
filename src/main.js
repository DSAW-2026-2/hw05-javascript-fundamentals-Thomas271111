import "./style.css";

// Lógica del toggle de modo oscuro (Capa 2: persiste en localStorage).

const STORAGE_KEY = "corral-theme";
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

function getPreferredTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "dark" || saved === "light") {
    return saved;
  }
  // Si el usuario nunca ha elegido, respeta la preferencia del sistema.
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Aplicar el tema apenas carga el script (evita el "flash" del tema incorrecto).
applyTheme(getPreferredTheme());

document.addEventListener("DOMContentLoaded", () => {
  const toggleButtons = document.querySelectorAll("[data-theme-toggle]");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isDark = root.classList.contains("dark");
      const newTheme = isDark ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem(STORAGE_KEY, newTheme);
    });
  });
});