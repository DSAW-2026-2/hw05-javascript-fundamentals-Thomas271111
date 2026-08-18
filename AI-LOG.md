# Bitácora de IA — HW04 (UX + Tailwind)

## ¿Usé IA para generar clases de Tailwind y para los wireframes?

Sí, usé Claude para reconstruir todo `index.html` y `about.html` con clases de utilidad de Tailwind, partiendo del diseño que ya teníamos en CSS normal de HW03 (mismo contenido, misma estructura semántica, solo cambiando cómo se aplican los estilos). No usé IA para los wireframes de Figma — esos los hice yo directamente en la herramienta.

## Paleta de colores: qué sugirió la IA y qué cambié

La IA mantuvo la paleta que ya habíamos definido en HW03 en vez de proponer una nueva desde cero (verde `#3f6b3f` como color principal, navy `#2f4a5c` como acento, fondo crema `#faf8f4`, texto `#2b2b26`), porque ya la habíamos ajustado juntos hace unas tareas y no tenía sentido reinventarla. Lo que sí tuve que decidir yo fue la paleta del **modo oscuro**, que no existía antes: la IA propuso usar directamente los grises por defecto de Tailwind (`gray-900` para el fondo, `gray-100` para el texto, `gray-800` para las tarjetas) en vez de intentar oscurecer manualmente los mismos tonos verdes/crema de la versión clara. Lo dejé así porque usar la escala de grises estándar de Tailwind es mucho más simple de mantener consistente en todos los componentes que estar calculando manualmente una versión oscura de cada color custom que ya tenía — y para el acento en modo oscuro sí pedí que usara un azul claro (`sky-400`) en vez del navy oscuro original, porque el navy casi no se distingue sobre un fondo `gray-900`.

## Qué aprendí de Tailwind que no habría aprendido si la IA hiciera todo

Lo que más me costó entender (y que tuve que preguntarle a la IA para que me explicara, no solo para que lo generara) fue cómo funciona el prefijo `dark:` — al principio pensé que Tailwind detectaba el modo oscuro del sistema operativo automáticamente y ya, pero en realidad por defecto Tailwind v4 sí hace eso (`prefers-color-scheme`), y para que el botón de la página controle el modo manualmente (y no solo el sistema operativo del usuario), hay que decirle explícitamente a Tailwind que el modo oscuro depende de una clase (`.dark`) en el `<html>`, y ser yo quien le agregue o quite esa clase con JavaScript. Sin entender eso, habría asumido que con solo escribir clases `dark:` ya tenía un botón funcional, y no habría entendido por qué el toggle no cambiaba nada la primera vez que lo probé.

También aprendí que Tailwind permite selectores "raros" como `:target` (el que uso para el acordeón de FAQ) usando la sintaxis de variante arbitraria `[&:target]:block` — no es algo que viene documentado como una clase con nombre propio (`target:block`), hay que saber que se puede envolver cualquier selector CSS válido entre corchetes.

## HW05 — JavaScript Fundamentals

### ¿Usé IA para escribir alguna función? Prompt y resultado

Sí. Le pedí a Claude que me ayudara con el atajo de teclado `Ctrl+K` para enfocar el buscador del FAQ — mi prompt fue: *"agrégame un atajo de teclado Ctrl+K que enfoque el input de búsqueda del FAQ, usando addEventListener sobre keydown"*.

La primera versión que generó fue algo así:

```js
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "k") {
    searchInput.focus();
  }
});
```

### Qué no entendí de inmediato

No entendí por qué, al probarlo en Chrome, el atajo enfocaba el input **pero además abría la barra de búsqueda del navegador** (el `Ctrl+K` de Chrome hace eso por defecto). Tuve que preguntarle a la IA por qué pasaba eso — me explicó que `Ctrl+K` es un atajo que el navegador ya tiene reservado, y que si no le digo explícitamente al evento que "no siga su curso normal" con `event.preventDefault()`, el navegador ejecuta su propio atajo **al mismo tiempo** que el mío.

### Qué cambié después de probarlo, y por qué

Le agregué `event.preventDefault()` apenas se cumple la condición del atajo, y también cubrí `event.metaKey` para que funcione igual en Mac (`Cmd+K`), y agregué `searchInput.select()` para que si ya había texto escrito, quede seleccionado y el usuario pueda simplemente empezar a escribir la nueva búsqueda sin tener que borrar primero:

```js
document.addEventListener("keydown", (event) => {
  const isShortcut = (event.ctrlKey || event.metaKey) && event.key === "k";
  if (isShortcut) {
    event.preventDefault();
    searchInput.focus();
    searchInput.select();
  }
});
```

Los cambios frente a la versión original de la IA:
- **Se agregó `event.preventDefault()`** — sin esto, el atajo competía con el atajo nativo del navegador y no funcionaba bien.
- **Se agregó `event.metaKey`** — la versión original solo cubría Windows/Linux (`ctrlKey`), no Mac.
- **Se agregó `searchInput.select()`** — mejora de UX que probé yo mismo al usar el buscador varias veces seguidas.
- **Se cambió `function (event)` por `(event) =>`** — para mantener el mismo estilo de arrow functions del resto del archivo.

### Selector/evento específico donde usé IA — original vs. final

También le pedí ayuda para el filtro en tiempo real del FAQ. La IA me dio primero esta versión:

```js
// Original de la IA
const searchInput = document.querySelector("#faq-search");
const items = document.querySelectorAll(".faq-item");

searchInput.addEventListener("keyup", function () {
  items.forEach(function (item) {
    if (item.innerText.toLowerCase().includes(searchInput.value.toLowerCase())) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});
```

Mi versión final quedó así:

```js
// Versión final
searchInput.addEventListener("input", () => {
  filterFaqItems(searchInput.value, faqItems, emptyMessage);
});

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
```

Diferencias y por qué las hice:
- **Cambié `.faq-item` por `[data-faq-item]`** y de `item.innerText` a `item.dataset.faqText` — la versión original comparaba contra todo el texto visible de la pregunta y la respuesta juntos (incluyendo el texto "Cerrar" del acordeón), lo cual daba resultados de búsqueda confusos. Usar un atributo `data-faq-text` con solo la pregunta me dio control exacto de qué se compara.
- **Cambié `keyup` por `input`** — con `keyup` el filtro no se actualizaba si el usuario pegaba texto con clic derecho o arrastraba texto al campo, porque eso no dispara eventos de teclado. `input` sí cubre esos casos.
- **Cambié `item.style.display` por `classList.toggle("hidden", ...)`** — para no mezclar estilos en línea escritos desde JS con las clases de Tailwind que ya controlan el resto del layout; así todo el "mostrar/ocultar" queda manejado de la misma forma (clases), no con estilos inline generados dinámicamente.
- **Agregué el conteo de resultados visibles y el mensaje de "no encontramos preguntas"** — la IA no lo incluyó en la primera versión, pero lo pedí después de notar que si buscabas algo que no existía, la lista simplemente quedaba vacía sin ninguna explicación.
