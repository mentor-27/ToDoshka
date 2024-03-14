export const putData = (id, data, refresh) => {
	fetch(`http://localhost:3005/todos/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title: data.title.trim(),
			description: data.description.trim(),
			done: data.done,
		}),
	}).then(refresh);
};
