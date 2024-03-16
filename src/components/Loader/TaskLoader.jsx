import React from 'react';
import styles from './TaskLoader.module.css';

export const TaskLoader = () => {
	return (
		<div className={styles.tlContainer}>
			<div className={styles.cssloadSpeedingWheel}></div>
		</div>
	);
};
