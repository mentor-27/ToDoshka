import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const usePutData = (setIsLoading, setConnectionError) => {
	const putData = (id, data) => {
		setIsLoading(true);

		const dbRef = ref(db, `todos/${id}`);

		set(dbRef, data)
			.then(() => setConnectionError(''))
			.catch(error => setConnectionError(error.message))
			.finally(() => setIsLoading(false));
	};

	return {
		putData,
	};
};
