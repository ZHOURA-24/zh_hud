const eventListeners = new Map();

async function fetchNui(
    eventName,
    data
) {
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
    };

    const resp = await fetch(`https://zh_hud/${eventName}`, options);

    return await resp.json();
}

function useNuiEvent(
    action,
    handler,
) {
    const handlers = eventListeners.get(action) || [];
    handlers.push(handler);
    eventListeners.set(action, handlers);
}

function eventListener(event) {
    const { action, data } = event.data;
    const handlers = eventListeners.get(action);

    if (handlers) {
        handlers.forEach((handler) => handler(data));
    }
}

function createIframe(slug) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://zhfivem.vercel.app/${slug}`;
    iframe.style = 'width:100vw;height:100vh;border:none;display:none;';
    document.body.appendChild(iframe);
    useNuiEvent('player', (d) => iframe.contentWindow.postMessage({ action: 'player', data: d }, '*'));
    useNuiEvent('vehicle', (d) => iframe.contentWindow.postMessage({ action: 'vehicle', data: d }, '*'));
    iframe.addEventListener('load', () => {
        iframe.contentWindow.postMessage({ action: 'load' }, '*');
        iframe.style.display = 'block';
    });
}

window.addEventListener('load', () => {
    window.addEventListener('message', eventListener);
    fetchNui('load').then((data) => {
        if (data && data.name) {
            createIframe(data.name);
        }
    });
});