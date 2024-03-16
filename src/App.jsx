import { useState } from 'react';
import { Task } from './components';
import styles from './App.module.css';
import { Loader, AddTaskModal } from './components';
import { useGetData, usePostData } from './hooks';

export const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [refresh, setRefresh] = useState(false);
	const [sorted, setSorted] = useState(false);
	const [filter, setFilter] = useState('');
	const [connectionError, setConnectionError] = useState(false);
	const [addModal, setAddModal] = useState(false);

	const { todos } = useGetData(sorted, filter, setIsLoading, setConnectionError);
	const { postData } = usePostData(setIsLoading, setConnectionError);

	const refreshList = () => setRefresh(!refresh);

	const props = {
		isLoading,
		todos,
		connectionError,
		setConnectionError,
		addModal,
		setAddModal,
		refreshList,
		sorted,
		setSorted,
		filter,
		setFilter,
		postData,
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
						props.todos.map(([key, task]) => (
							<Task
								key={key}
								id={key}
								{...task}
								setConnectionError={props.setConnectionError}
							/>
						))) || (
						<h2>
							{props.connectionError ? (
								<span className={styles.error}>{props.connectionError}</span>
							) : (
								<span className={styles.emptySign}>No data to show</span>
							)}
						</h2>
					)
				)}
			</div>
			{props.addModal && (
				<AddTaskModal showModal={props.setAddModal} postData={props.postData} />
			)}
		</>
	);
};
