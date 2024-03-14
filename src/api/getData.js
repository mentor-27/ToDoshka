export const getData = async (sorted, filter) => {
	const resp = await fetch('http://localhost:3005/todos');
	let data = await resp.json();
	if (sorted) data.sort((a, b) => a.title.localeCompare(b.title));
	if (filter)
		data = data.filter(item => item.title.toLowerCase().match(filter.toLowerCase()));
	return data;
};
