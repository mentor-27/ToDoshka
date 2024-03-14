import { useState } from 'react';
import styles from './Task.module.css';
import { patchData, putData, deleteData } from '../../api';

const createRemover = (id, refresh) => () => {
	deleteData(id, refresh);
};

export const Task = ({ id, title, description, done, refresh }) => {
	const [_title, setTitle] = useState(title);
	const [_description, setDescription] = useState(description);
	const [isEditing, setIsEditing] = useState({ bool: false, sign: 'Edit' });

	const onTitleChange = ({ target }) => {
		setTitle(target.value);
	};
	const onDescriptionChange = ({ target }) => {
		setDescription(target.value);
		target.style.height = `${target.scrollHeight + 1.5}px`;
	};

	const updateData = () => {
		const signs = ['Edit', 'Save'];
		setIsEditing({ bool: !isEditing.bool, sign: signs[Number(!isEditing.bool)] });
		if (isEditing.bool && _title) {
			putData(
				id,
				{
					title: _title,
					description: _description,
					done,
				},
				refresh,
			);
		} else if (isEditing.bool && !_title) {
			alert('Task title must be set!');
		}
	};

	const updateStatus = () => {
		patchData(id, !done, refresh);
	};

	const deleteItem = createRemover(id, refresh);

	const props = {
		id,
		_title,
		_description,
		done,
		refresh,
		isEditing,
		onTitleChange,
		onDescriptionChange,
		updateData,
		updateStatus,
		deleteItem,
	};

	return <TaskLayout {...props} />;
};

const TaskLayout = props => {
	return (
		<div className={styles.taskContainer}>
			<div>
				<input
					className={styles.taskTitle}
					type="text"
					value={props._title}
					onChange={props.onTitleChange}
					placeholder="Must not be empty"
					required
					{...(!props.isEditing.bool ? { readOnly: true } : {})}
				/>
				<button className={styles.deleteButton} onClick={props.deleteItem}></button>
				<hr color="#ccc" width="100%" />
			</div>
			<textarea
				className={styles.taskDescription}
				type="text"
				value={props._description}
				onChange={props.onDescriptionChange}
				{...(!props.isEditing.bool ? { readOnly: true } : {})}
			/>
			<div>
				<hr color="#ccc" width="100%" />
				<div className={styles.taskFooter}>
					<button
						className={`${styles.button} ${styles.edit}`}
						onClick={props.updateData}
						{...(!props._title ? { disabled: true } : {})}
					>
						{props.isEditing.sign}
					</button>
					<button
						className={
							props.done
								? `${styles.button} ${styles.done}`
								: `${styles.button} ${styles.inProgress}`
						}
						onClick={props.updateStatus}
					>
						{props.done ? 'Done \u2713' : 'In progress...'}
					</button>
				</div>
			</div>
		</div>
	);
};
