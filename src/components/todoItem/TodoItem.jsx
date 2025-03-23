import styles from './TodoItem.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const TodoItem = ({
	id,
	title,
}) => {

	return (
			<Link to={`task/${id}`}>
				<div className={styles.task}>
					<span>{title}</span>
				</div>
			</Link>
	);
};

TodoItem.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
};
