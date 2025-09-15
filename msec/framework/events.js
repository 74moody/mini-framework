const eventRegistry = {};

export function onEvent(eventType, selector, handler) {
    // Create a registry entry for this event type if it doesn't exist
    if (!eventRegistry[eventType]) {
        eventRegistry[eventType] = [];
        document.addEventListener(eventType, (e) => {
            // Find all registered handlers for this event type
            eventRegistry[eventType].forEach(registration => {
                const targets = document.querySelectorAll(registration.selector);
                targets.forEach(target => {
                    if (target === e.target || target.contains(e.target)) {
                        registration.handler(e);
                    }
                });
            });
        });
    }
    
    // Add this handler to the registry
    eventRegistry[eventType].push({ selector, handler });
}
