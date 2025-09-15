
export function createElement(node) {
    const el = document.createElement(node.tag);
    if (node.attrs) {
        for (let attr in node.attrs) {
            if (node.attrs[attr] !== undefined) {
                el.setAttribute(attr, node.attrs[attr]);
            }
        }
    }
    if (node.children) {
        node.children.forEach(child => {
            const childEl = (typeof child === 'string')
                ? document.createTextNode(child)
                : createElement(child);
            el.appendChild(childEl);
        });
    }
    return el;
}

export function renderDOM(vdom, root) {
    root.innerHTML = '';
    root.appendChild(createElement(vdom));
}
