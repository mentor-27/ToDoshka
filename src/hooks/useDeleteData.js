import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useDeleteData = (setIsTaskLoading, setConnectionError) => {
	const deleteData = id => {
		setIsTaskLoading(true);
		const dbRef = ref(db, `todos/${id}`);

		remove(dbRef)
			.then(() => {
				setConnectionError('');
			})
			.catch(error => setConnectionError(error.message))
			.finally(() => setIsTaskLoading(false));
	};

	return {
		deleteData,
	};
};
