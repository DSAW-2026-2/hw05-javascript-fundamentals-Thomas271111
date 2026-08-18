# HW05 — JavaScript Fundamentals

## Thomas Andres Rincon Cañon
## Link: https://dsaw-2026-2.github.io/hw05-javascript-fundamentals-Thomas271111/

**Week 5 · DSAW · Universidad de La Sabana**

## Objective

Add real interactivity to your project page using **vanilla JavaScript** — no libraries, no frameworks.

## Deliverables

### `index.html` (+ external JS or `<script>`)

Implement **at least 2 distinct interactive behaviors**. Examples relevant to your project:
- Navigation menu that opens/closes
- Form with inline validation that shows errors (no `alert()`)
- Counter, search, filter, accordion, modal
- Image preview before upload
- Anything that improves the user experience

**Technical requirements:**
- Use `addEventListener` for all events — **zero inline handlers** (`onclick="..."`)
- At least **one custom keyboard shortcut** using `keydown` or `keyup`
- Real DOM manipulation: select elements and change their content or appearance dynamically

## Layer 2

The keyboard shortcut must be non-obvious: not just Enter to submit. Examples: `Ctrl+K` to open search, `Escape` to close a modal.

## AI Log (`AI-LOG.md`)

- Did you use AI to write any function? Show the prompt and the result.
- Which part of the generated code did you not understand immediately?
- What did you change after testing it and why?

## Deployment

GitHub Pages.

## Autograding

The pipeline will check:
- ✅ `index.html` exists and has content
- ✅ ESLint passes (`no-var`, `eqeqeq`, no inline handlers)
- ✅ GitHub Pages responds with HTTP 200
- ✅ 2 interactive behaviors, keyboard shortcut, no libraries (reviewed by Claude)

> **Submission rule:** If it is not deployed and public, it cannot be graded.
