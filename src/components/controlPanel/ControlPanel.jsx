import { requestAddToDo } from '../../services/toDoAdd';
import { useState, useRef, useEffect } from 'react';
import styles from './ControlPanel.module.css';
import { FaSortAlphaDown } from 'react-icons/fa';
import { TbFilterCancel } from 'react-icons/tb';
import PropTypes from 'prop-types';
import { RiAddBoxLine } from "react-icons/ri";

export const ControlPanel = ({
	error,
	setError,
	isSorted,
	setIsSorted,
	refreshToDo,
	setRefreshToDo,
	searchStr,
	setSearchStr,
	searchStrInput,
	setSearchStrInput,
}) => {
	const [title, setTitle] = useState('');
	const inputRef = useRef(null);


	useEffect(() => {
		if(inputRef.current) {
			inputRef.current.focus();
		}
	}, [searchStrInput])

	const addTodo = (event) => {
		event.preventDefault();
		if (title.length < 1) {
			setError('Укажите задачу');
			return;
		} else {
			setError('');
		}

		requestAddToDo(title, false).then((response) => {
			console.log('дело добавлено, ответ сервера:', response);
			setRefreshToDo(!refreshToDo);
			setTitle('');
		});
	};

	return (
		<>
			<form onSubmit={addTodo}>
				<div className={styles['input-group']}>
					<input
						type="text"
						placeholder="Добавить новую задачу"
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
					<button type="submit">
						<RiAddBoxLine/> Добавить
					</button>
				</div>
				<div className={styles['input-group']}>
					<input
						ref={inputRef}
						type="text"
						placeholder="поиск..."
						value={searchStrInput}
						onChange={({ target }) => setSearchStrInput(target.value)}/>
					<button
						type="button"
						onClick={() => !searchStr ? setSearchStr(searchStrInput) : setSearchStr('')}>
						{!searchStr ? 'Найти' : 'Отменить'}
					</button>
				</div>
				<button type="button" onClick={() => setIsSorted(!isSorted)}>
					{isSorted ? (
						<>
							<TbFilterCancel /> Отменить
						</>
					) : (
						<>
							<FaSortAlphaDown /> Сортировать
						</>
					)}
				</button>
			</form>
			{error !== '' && <div className={styles.error}>{error}</div>}
		</>
	);
};

ControlPanel.propTypes = {
	error: PropTypes.string,
	setError: PropTypes.func.isRequired,
	isSorted: PropTypes.bool,
	setIsSorted: PropTypes.func.isRequired,
	refreshToDo: PropTypes.bool,
	setRefreshToDo: PropTypes.func.isRequired,
	searchStr: PropTypes.string,
	setSearchStr: PropTypes.func.isRequired,
	searchStrInput: PropTypes.string,
	setSearchStrInput: PropTypes.func.isRequired,
};
