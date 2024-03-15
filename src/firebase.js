import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyDSdIpfr3eg5p1XFpjePe8GnhuzHqGdEu8',
	authDomain: 'todolist-8c38a.firebaseapp.com',
	databaseURL: 'https://todolist-8c38a-default-rtdb.firebaseio.com',
	projectId: 'todolist-8c38a',
	storageBucket: 'todolist-8c38a.appspot.com',
	messagingSenderId: '247182955367',
	appId: '1:247182955367:web:255825b76f48cfd09f15c2',
	databaseURL: 'https://todolist-8c38a-default-rtdb.firebaseio.com/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
