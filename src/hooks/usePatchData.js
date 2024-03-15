import { ref, update } from 'firebase/database';
import { db } from '../firebase';

export const usePatchData = (setIsLoading, setConnectionError) => {
	const patchData = (id, data) => {
		setIsLoading(true);

		const dbRef = ref(db, `todos/${id}`);

		update(dbRef, data)
			.then(() => setConnectionError(''))
			.catch(error => setConnectionError(error.message))
			.finally(() => setIsLoading(false));
	};

	return {
		patchData,
	};
};
