export const requestGetTodoById = (id) =>
	fetch(`http://localhost:3005/toDo/${id}`)
		.then((response) => response.json())
