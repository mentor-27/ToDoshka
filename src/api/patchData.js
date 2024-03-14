export const patchData = (id, data, refresh) => {
	fetch(`http://localhost:3005/todos/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			done: data,
		}),
	}).then(refresh);
};
