import { renderDOM, onEvent, setState, getState, subscribe } from '../msec/framework/index.js';

const state = {
    todos: [],
    filter: 'all',
    editingTodoId: null
};

setState(state);

function render() {
    const { todos, filter, editingTodoId } = getState();
    const hasTodos = todos.length > 0;
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const app = {
        tag: "section",
        attrs: { class: "todoapp" },
        children: [
            { 
                tag: "header",
                attrs: { class: "header" },
                children: [
                    { tag: "h1", children: ["todos"] },
                    {
                        tag: "input",
                        attrs: {
                            class: "new-todo",
                            id: "newTodo",
                            placeholder: "What needs to be done?",
                            autofocus: "true"
                        }
                    }
                ]
            },
            {
                tag: "section",
                attrs: { class: "main" },
                children: [
                    {
                        tag: "ul",
                        attrs: { class: "todo-list" },
                        children: filteredTodos.map(todo => ({
                            tag: "li",
                            attrs: {
                                class: `${todo.completed ? "completed" : ""} ${editingTodoId === todo.id ? "editing" : ""}`,
                                "data-id": todo.id
                            },
                            children: [
                                {
                                    tag: "div",
                                    attrs: { class: "view" },
                                    children: [
                                        {
                                            tag: "input",
                                            attrs: {
                                                class: "toggle",
                                                type: "checkbox",
                                                checked: todo.completed ? "checked" : undefined
                                            }
                                        },
                                        {
                                            tag: "label",
                                            children: [todo.title],
                                            attrs: { ondblclick: `editTodo(${todo.id})` }
                                        },
                                        { tag: "button", attrs: { class: "destroy" } }
                                    ]
                                },
                                ...(editingTodoId === todo.id
                                    ? [{
                                        tag: "input",
                                        attrs: {
                                            class: "edit",
                                            value: todo.title,
                                            autofocus: "true",
                                            onblur: `doneEdit(event, ${todo.id})`,
                                            onkeydown: `handleEditKey(event, ${todo.id})`
                                        }
                                    }]
                                    : [])
                            ]
                        }))
                    }
                ]
            },
            ...(hasTodos ? [{
                tag: "footer",
                attrs: { class: "footer" },
                children: [
                    {
                        tag: "span",
                        attrs: { class: "todo-count" },
                        children: [
                            `${todos.filter(t => !t.completed).length} items left`
                        ]
                    },
                    {
                        tag: "ul",
                        attrs: { class: "filters" },
                        children: [
                            { tag: "li", children: [{ tag: "a", attrs: { href: "#", class: filter === 'all' ? 'selected' : '' }, children: ["All"] }] },
                            { tag: "li", children: [{ tag: "a", attrs: { href: "#active", class: filter === 'active' ? 'selected' : '' }, children: ["Active"] }] },
                            { tag: "li", children: [{ tag: "a", attrs: { href: "#completed", class: filter === 'completed' ? 'selected' : '' }, children: ["Completed"] }] }
                        ]
                    },
                    ...(todos.some(todo => todo.completed) ? [{
                        tag: "button",
                        attrs: { class: "clear-completed" },
                        children: ["Clear completed"]
                    }] : [])
                ]
            }] : [])
        ]
    };

    renderDOM(app, document.getElementById("app"));
}

subscribe(render);
render();

onEvent("keydown", "#newTodo", (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
        const todos = getState().todos;
        todos.push({ id: Date.now(), title: e.target.value.trim(), completed: false });
        setState({ ...getState(), todos });
        e.target.value = "";
    }
});

onEvent("click", ".toggle", (e) => {
    const id = +e.target.closest("li").dataset.id;
    const todos = getState().todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    setState({ ...getState(), todos });
});

onEvent("click", ".destroy", (e) => {
    const id = +e.target.closest("li").dataset.id;
    const todos = getState().todos.filter(todo => todo.id !== id);
    setState({ ...getState(), todos });
});

onEvent("click", ".clear-completed", () => {
    const todos = getState().todos.filter(todo => !todo.completed);
    setState({ ...getState(), todos });
});

window.addEventListener("hashchange", () => {
    const hash = window.location.hash;
    if (!location.hash || location.hash === '#') {
        location.hash = 'todoMVC';
    }    
    const filter = hash.includes("active") ? "active" : hash.includes("completed") ? "completed" : "all";
    setState({ ...getState(), filter });
});

window.editTodo = function (id) {
    setState({ ...getState(), editingTodoId: id });
};

window.doneEdit = function (e, id) {
    const value = e.target.value.trim();
    if (value) {
        const todos = getState().todos.map(todo => todo.id === id ? { ...todo, title: value } : todo);
        setState({ ...getState(), todos, editingTodoId: null });
    } else {
        const todos = getState().todos.filter(todo => todo.id !== id);
        setState({ ...getState(), todos, editingTodoId: null });
    }
};

window.handleEditKey = function (e, id) {
    if (e.key === "Enter") {
        window.doneEdit(e, id);
    }
    if (e.key === "Escape") {
        setState({ ...getState(), editingTodoId: null });
    }
};
