import styles from './app.module.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { TaskPage } from './pages/TaskPage';
import { NotFound } from './pages/NotFound';

export const App = () => {
	return (
		<div className={styles.app}>
			<div className={styles.content}>
				<Routes>
					<Route path="/" element={<MainPage/>} />
					<Route path="/task/:id" element={<TaskPage/>} />
					<Route path="/404" element={<NotFound/>} />
					<Route path="*" element={<Navigate to="/404" />} />
				</Routes>
			</div>
		</div>
	);
};
