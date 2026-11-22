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

function setHudValue(key, value) {
	const el = document.getElementById(key);
	if (el) el.textContent = value;

	document.querySelectorAll(`[data-hud="${key}"]`).forEach((target) => {
		target.style.setProperty('--value', value);
	});
}

useNuiEvent('player', ({ key, value }) => setHudValue(key, value));

useNuiEvent('vehicle', ({ key, value }) => {
	if (key === 'inside') {
		document.getElementById('vehicle').style.display = value ? '' : 'none';
		return;
	}
	setHudValue(key, value);
});

async function load(slug) {
	const resp = await fetch(`http://localhost:5173/${slug}`);
	const data = await resp.json();

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

	const vehicleEl = document.getElementById('vehicle');
	vehicleEl.style.display = 'none';
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
