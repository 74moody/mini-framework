
const routes = {};

export function defineRoute(path, component) {
    routes[path] = component;
}

export function navigate(path) {
    window.history.pushState({}, path, window.location.origin + path);
    renderRoute();
}

export function renderRoute() {
    const path = window.location.pathname;
    const component = routes[path];
    if (component) {
        component();
    }
}

window.onpopstate = renderRoute;
