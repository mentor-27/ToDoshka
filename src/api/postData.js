export const postData = (data, refresh) => {
	fetch('http://localhost:3005/todos', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title: data.title.trim(),
			description: data.description.trim(),
			done: false,
		}),
	}).then(refresh);
};
