import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useDeleteData = (setIsLoading, setConnectionError) => {
	const deleteData = id => {
		setIsLoading(true);

		const dbRef = ref(db, `todos/${id}`);

		remove(dbRef)
			.then(() => setConnectionError(''))
			.catch(error => setConnectionError(error.message))
			.finally(() => setIsLoading(false));
	};

	return {
		deleteData,
	};
};
