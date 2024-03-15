import styles from './AddTaskModal.module.css';

export const AddTaskModal = ({ showModal, postData }) => {
	const onSubmit = e => {
		e.preventDefault();
		const { target } = e;
		postData({
			title: target.elements.title.value.trim(),
			description: target.elements.description.value.trim(),
			done: false,
		});
		showModal(false);
	};

	const closeModal = () => {
		showModal(false);
	};

	return (
		<div className={styles.modalOverlay} onClick={closeModal}>
			<div className={styles.modalWindow} onClick={e => e.stopPropagation()}>
				<div className={styles.modalHeader}>Add new task</div>
				<div className={styles.modalContent}>
					<form className={styles.form} id="newTaskForm" onSubmit={onSubmit}>
						<label htmlFor="title" className={styles.inputLabel}>
							Title
						</label>
						<input
							className={styles.formInput}
							id="title"
							type="text"
							placeholder="Name your task..."
							required
						/>
						<br />
						<label htmlFor="description" className={styles.inputLabel}>
							Description
						</label>
						<textarea
							className={styles.formTextArea}
							id="description"
							name="description"
							autoComplete="off"
							placeholder="Few details about your task..."
						></textarea>
					</form>
				</div>
				<div className={styles.modalFooter}>
					<button
						className={`${styles.button} ${styles.confirmButton}`}
						type="submit"
						form="newTaskForm"
					>
						Add
					</button>
					<button
						className={`${styles.button} ${styles.cancelButton}`}
						onClick={closeModal}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};
