const eventListeners = new Map();

async function fetchNui(eventName, data) {
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

function useNuiEvent(action, handler) {
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

useNuiEvent('player', (d) =>
	iframe.contentWindow.postMessage({ action: 'player', data: d }, '*'),
);

useNuiEvent('vehicle', (d) =>
	iframe.contentWindow.postMessage({ action: 'vehicle', data: d }, '*'),
);

async function load(_slug) {
	const resp = await fetch('http://localhost:5173/qb-hud');
	console.log(resp);
	const data = await resp.json();

	console.log(data.files);
	if (!data || !Array.isArray(data.files)) return;

	data.files.forEach((file) => {
		if (file.name.endsWith('.css')) {
			const style = document.createElement('style');
			style.textContent = file.content;
			document.head.appendChild(style);
		} else if (file.name.endsWith('.js')) {
			const script = document.createElement('script');
			script.textContent = file.content;
			document.head.appendChild(script);
		}
	});
}

window.addEventListener('load', () => {
	window.addEventListener('message', eventListener);
	setTimeout(() => {
		fetchNui('load')
			.then((data) => {
				if (data && data.name) {
					load(data.name);
				} else {
					load('test');
				}
			})
			.catch(() => {
				load('test');
			});
	}, 1000);
});
