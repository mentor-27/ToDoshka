import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const usePostData = setConnectionError => {
	const postData = data => {
		const dbRef = ref(db, `todos`);

		push(dbRef, data)
			.then(() => {
				setConnectionError('');
			})
			.catch(error => setConnectionError(error.message));
	};

	return {
		postData,
	};
};
