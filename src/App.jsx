import { useEffect, useState } from 'react';
import { Task } from './components';
import styles from './App.module.css';
import { Loader, AddTaskModal } from './components';
import { getData } from './api';
import { useDebounce } from './hooks/useDebounce';

export const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [refresh, setRefresh] = useState(false);
	const [todos, setTodos] = useState([]);
	const [sorted, setSorted] = useState(false);
	const [filter, setFilter] = useState('');
	const [connectionError, setConnectionError] = useState(false);
	const [addModal, setAddModal] = useState(false);
	const debFilter = useDebounce(filter, 500);

	const refreshList = () => setRefresh(!refresh);

	useEffect(() => {
		getData(sorted, filter)
			.then(data => {
				setTodos(data);
				setConnectionError(false);
			})
			.catch(error => {
				setConnectionError(true);
				console.error(error);
			})
			.finally(() => setIsLoading(false));
	}, [refresh, sorted, debFilter]);

	const props = {
		isLoading,
		todos,
		connectionError,
		addModal,
		setAddModal,
		refreshList,
		sorted,
		setSorted,
		filter,
		setFilter,
	};

	return <AppLayout {...props} />;
};

const AppLayout = props => {
	return (
		<>
			<header className={styles.todoHeader}>
				<h1 className={styles.todoTitle}>To-Do List</h1>
				{!props.isLoading && !props.connectionError && (
					<>
						<button
							className={styles.addTask}
							onClick={() => props.setAddModal(true)}
							disabled={props.connectionError}
						>
							+
						</button>
						<input
							className={styles.todoSearch}
							type="text"
							onChange={({ target }) => props.setFilter(target.value)}
							value={props.filter}
							placeholder="Search"
						/>
						<div
							className={styles.sortBlock}
							onClick={() => props.setSorted(prev => !prev)}
							style={!props.sorted ? { filter: 'grayscale(1)' } : {}}
						></div>
					</>
				)}
			</header>
			<div className={styles.taskList}>
				{props.isLoading ? (
					<Loader />
				) : (
					(props.todos?.length &&
						props.todos.map(task => (
							<Task key={task.id} {...task} refresh={props.refreshList} />
						))) || (
						<h2>
							{props.connectionError ? (
								<span className={styles.error}>Data server is unavailable</span>
							) : (
								<span className={styles.emptySign}>No data to show</span>
							)}
						</h2>
					)
				)}
			</div>
			{props.addModal && (
				<AddTaskModal showModal={props.setAddModal} refresh={props.refreshList} />
			)}
		</>
	);
};
