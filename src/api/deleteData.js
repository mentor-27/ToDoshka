export const deleteData = (id, refresh) => {
	fetch(`http://localhost:3005/todos/${id}`, {
		method: 'DELETE',
	}).then(refresh);
};
