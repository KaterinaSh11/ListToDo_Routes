	import { requestGetToDo } from "../services/toDoGet";
	import { ControlPanel } from "../components/controlPanel/ControlPanel"
	import { TodoList } from "../components/todoList/TodoList"
	import { useEffect, useState } from 'react';

	export const MainPage = () => {
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
