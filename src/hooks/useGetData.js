import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

export const useGetData = (sorted, filter, setIsLoading, setConnectionError) => {
	const [todos, setTodos] = useState([]);
	const debFilter = useDebounce(filter, 500);

	useEffect(() => {
		try {
			const dbRef = ref(db, 'todos');

			return onValue(dbRef, spanshot => {
				let actualData = Object.entries(spanshot.val()) || [];

				if (sorted) {
					actualData.sort(([, a], [, b]) => a.title.localeCompare(b.title));
				}

				if (filter)
					actualData = actualData.filter(([, item]) =>
						item.title.toLowerCase().match(filter.toLowerCase()),
					);

				setTodos(actualData);
				setIsLoading(false);
			});
		} catch (error) {
			setConnectionError(error.message);
			setIsLoading(false);
		}
	}, [sorted, debFilter]);

	return {
		todos,
	};
};
