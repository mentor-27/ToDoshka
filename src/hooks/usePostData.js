import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const usePostData = (setIsLoading, setConnectionError) => {
	const postData = data => {
		setIsLoading(true);

		const dbRef = ref(db, `todos`);

		push(dbRef, data)
			.then(() => setConnectionError(''))
			.catch(error => setConnectionError(error.message))
			.finally(() => setIsLoading(false));
	};

	return {
		postData,
	};
};
