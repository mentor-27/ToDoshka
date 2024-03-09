import { useEffect, useState } from 'react';
import { Task } from './components';
import styles from './App.module.css';
import { Loader } from './components/Loader/Loader';

export const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [users, setUsers] = useState([]);
	const [activeUser, setActiveUser] = useState(1);
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		Promise.all([
			fetch('https://jsonplaceholder.typicode.com/users'),
			fetch('https://jsonplaceholder.typicode.com/todos'),
		])
			.then(resps => {
				const parsed = resps.map(resp => resp.json());
				return Promise.all(parsed);
			})
			.then(datas => {
				setUsers(datas[0]);
				const todoGroups = Object.groupBy(datas[1], ({ userId }) => userId);
				setTodos(todoGroups);
				setIsLoading(false);
			});
	}, []);

	return <AppLayout {...{ isLoading, users, activeUser, todos, setActiveUser }} />;
};

const AppLayout = ({ isLoading, users, activeUser, todos, setActiveUser }) => {
	return (
		<>
			<h1 className={styles.todoTitle}>
				<select
					className={styles.todoUsers}
					defaultValue={activeUser}
					onChange={({ target }) => setActiveUser(+target.value)}
				>
					{isLoading ? (
						<option>Loading...</option>
					) : (
						users.map((user, i) => (
							<option key={i} value={i + 1}>
								{user.name}'s
							</option>
						))
					)}
				</select>
				<span>To-Do List</span>
			</h1>
			<div className={styles.taskList}>
				{isLoading ? (
					<Loader />
				) : (
					todos[activeUser].map((task, index) => (
						<Task
							key={task.id}
							{...task}
							index={index}
							name={users[activeUser - 1].name}
						/>
					))
				)}
			</div>
		</>
	);
};
