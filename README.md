# ⚡ MSEC - Lightweight JavaScript Framework

MSEC is a lightweight JavaScript framework for DOM abstraction, routing, state management, and event handling.

## 🚀 Features
- Virtual DOM abstraction
- Custom routing system
- Centralized state management
- Event handling system

## 📌 How to Use

### 1. Create an Element
```js
import { createElement } from './framework/index.js';

const node = {
  tag: "div",
  attrs: { class: "card" },
  children: [
    { tag: "h2", children: ["Hello"] },
    { tag: "button", attrs: { id: "btn" }, children: ["Click Me"] }
  ]
};

const el = createElement(node);
document.body.appendChild(el);
```

### 2. Nest Elements
Use the `children` array.

### 3. Add Attributes
Use the `attrs` object inside the element definition.

### 4. Event Handling
```js
import { onEvent } from './framework/index.js';

onEvent("click", "#btn", () => {
  alert("Clicked!");
});
```

### 5. State Management
```js
import { setState, getState, subscribe } from './framework/index.js';

setState({ todos: [] });
subscribe(state => {
  console.log("New state: ", state);
});
```

### 6. Routing
```js
import { defineRoute, navigate, renderRoute } from './framework/index.js';

defineRoute("/", HomeComponent);
defineRoute("/about", AboutComponent);

navigate("/about");
```

## 📂 Folder Structure
```
msec/
├── framework/
│   ├── dom.js
│   ├── state.js
│   ├── router.js
│   ├── events.js
│   └── index.js
├── todoMVC/
│   ├── index.html
│   ├── app.js
│   └── styles.css
└── README.md
```
