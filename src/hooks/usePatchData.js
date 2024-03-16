import { ref, update } from 'firebase/database';
import { db } from '../firebase';

export const usePatchData = (setIsTaskLoading, setConnectionError) => {
	const patchData = (id, data) => {
		setIsTaskLoading(true);
		const dbRef = ref(db, `todos/${id}`);

		update(dbRef, data)
			.then(() => {
				setConnectionError('');
			})
			.catch(error => setConnectionError(error.message))
			.finally(() => setIsTaskLoading(false));
	};

	return {
		patchData,
	};
};
