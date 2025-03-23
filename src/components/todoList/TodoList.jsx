import PropTypes from 'prop-types';
import { TodoItem } from '../todoItem/TodoItem';

export const TodoList = ({
	sortedTodos,
}) => {
	return (
		<>
			{sortedTodos.map(({ id, title }) => (
					<TodoItem
						id={id}
						title={title}
						key={id}
					></TodoItem>
				))
			}
		</>
	);
};

TodoList.propTypes = {
	sortedTodos: PropTypes.array,
}
