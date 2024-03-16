import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const usePutData = (setIsTaskLoading, setConnectionError) => {
	const putData = (id, data) => {
		setIsTaskLoading(true);
		const dbRef = ref(db, `todos/${id}`);

		set(dbRef, data)
			.then(() => {
				setConnectionError('');
			})
			.catch(error => setConnectionError(error.message))
			.finally(() => setIsTaskLoading(false));
	};

	return {
		putData,
	};
};
