import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { requestGetToDo } from './services/toDoGet';
import { ControlPanel } from './components/controlPanel/ControlPanel';
import { TodoList } from './components/todoList/TodoList';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TodoItemEdit } from './components/todoItemEdit/TodoItemEdit';

export const App = () => {
	const [tasks, setTasks] = useState([]);
	const [error, setError] = useState('');
	const [refreshToDo, setRefreshToDo] = useState(false);
	const [isSorted, setIsSorted] = useState(false);
	const [searchStr, setSearchStr] = useState('');
	const [searchStrInput, setSearchStrInput] = useState('');

	useEffect(() => {
		requestGetToDo().then((data) => {
		setTasks(data);
	});
	}, [refreshToDo]);

	let sortedTodos = isSorted
		? tasks.toSorted((a, b) => a.title.localeCompare(b.title))
		: tasks;

	sortedTodos = searchStr
		? sortedTodos.filter(todo => todo.title.toLowerCase().includes(searchStr.toLowerCase()))
		: sortedTodos;

	const MainPage = () => {
		return (
			<>
				<ControlPanel
					error={error}
					setError={setError}
					isSorted={isSorted}
					setIsSorted={setIsSorted}
					refreshToDo={refreshToDo}
					setRefreshToDo={setRefreshToDo}
					searchStr={searchStr}
					setSearchStr={setSearchStr}
					searchStrInput={searchStrInput}
					setSearchStrInput={setSearchStrInput}
				/>
				<TodoList
					sortedTodos={sortedTodos}
				/>
			</>
		);
	};

	const TaskPage = () => {
		return (
				<TodoItemEdit
					setRefreshToDo={setRefreshToDo}
					refreshToDo={refreshToDo}
					setError={setError}
				/>
		);
	}

	const NotFound = () => {
		return(
			<>
				<span>404</span>
				<span>страницы не существует</span>
			</>
		);
	}

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
