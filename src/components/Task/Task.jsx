import styles from './Task.module.css';

export const Task = ({ name, index, title, completed }) => {
	return (
		<div className={styles.taskContainer}>
			<h2 className={styles.taskNum}>
				{name}'s task №{index + 1}
			</h2>
			<hr color="#ccc" width="100%" />
			<div className={styles.taskTitle}>{title}</div>
			<button
				className={
					completed
						? `${styles.completeButton} ${styles.done}`
						: `${styles.completeButton} ${styles.inProgress}`
				}
			>
				{completed ? 'Done \u2713' : 'In progress...'}
			</button>
		</div>
	);
};
