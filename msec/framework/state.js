
let state = {};
let listeners = [];

export function setState(newState) {
    state = { ...state, ...newState };
    listeners.forEach(fn => fn(state));
}

export function getState() {
    return state;
}

export function subscribe(fn) {
    listeners.push(fn);
}
