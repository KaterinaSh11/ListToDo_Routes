import { AiTwotoneEdit } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoChevronBack } from 'react-icons/io5';
import { Checkbox } from '../checkbox/Checkbox';
import { IoIosSave } from 'react-icons/io';
import { MdCancelPresentation } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { requestChangeToDo } from '../../services/toDoChange';
import { requestGetTodoById } from '../../services/todoGetById';
import { requestDeleteToDo } from '../../services/toDoDelete';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './TodoItemEdit.module.css';

export const TodoItemEdit = ({ setError, refreshToDo, setRefreshToDo }) => {
	const [isPushedChange, setIsPushedChange] = useState(false);
	const [itemTitle, setItemTitle] = useState('');
	const [task, setTask] = useState('');
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		requestGetTodoById(params.id).then((data) => {
			if (!data.id) {
				navigate('/404');
				return;
			}
			setTask(data);
		});
	}, []);

	const saveTodoItem = () => {
		requestChangeToDo(itemTitle, task.completed, params.id).then((response) => {
			console.log('Задача изменена, ответ сервера: ', response);
			setTask(response);
			setIsPushedChange(false);
		});
	};

	const cancel = () => {
		setIsPushedChange(false);
		setItemTitle('');
	};

	const deleteToDo = () => {
		requestDeleteToDo(task.id).then((response) => {
			console.log('Задача удалена, ответ сервера: ', response);
			navigate('/');
		});
	};

	const changeToDo = () => {
		requestChangeToDo(task.title, !task.completed, task.id).then((response) => {
			console.log(`Состояние чекбокс ${!task.completed}, ответ сервера:`, response);
			setTask(response);
		});
	};

	return (
		<>
			{!isPushedChange ? (
				<div className={styles.task}>
					<span>{task.title}</span>
					<Checkbox isChecked={task.completed} onChange={() => changeToDo()} />
					<button
						type="button"
						onClick={() => {
							setIsPushedChange(true);
							setItemTitle(task.title);
						}}
					>
						<AiTwotoneEdit />
					</button>
					<button className={styles.delete} onClick={() => deleteToDo()}>
						<RiDeleteBin6Line />
					</button>
				</div>
			) : (
				<div className={styles['input-group']}>
					<input
						type="text"
						value={itemTitle}
						onChange={({ target }) => setItemTitle(target.value)}
					/>
					<button type="button" onClick={() => saveTodoItem()}>
						<IoIosSave />
					</button>
					<button type="button" onClick={cancel}>
						<MdCancelPresentation />
					</button>
				</div>
			)}
			<Link to="/">
				<button>
					<IoChevronBack />
					Назад
				</button>
			</Link>
		</>
	);
};

TodoItemEdit.propTypes = {
	setRefreshToDo: PropTypes.func.isRequired,
	refreshToDo: PropTypes.bool,
	setError: PropTypes.func.isRequired,
};
