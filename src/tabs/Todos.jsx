import { useEffect, useState } from 'react';
import Form from '../components/Form/Form';
import TodoList from '../components/TodoList/TodoList';
import Text from '../components/Text/Text';
import EditForm from '../components/EditForm/EditForm';

const Todos = () => {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem('todos-key')) ?? []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const addNewTodo = newTodo => {
    if (findTodo(newTodo.text)) {
      alert('Already extist');
      return;
    }

    setTodos(prevState => {
      return [...prevState, newTodo];
    });
  };

  useEffect(() => {
    localStorage.setItem('todos-key', JSON.stringify(todos));
  }, [todos]);

  const deleteTodo = todoID => {
    setTodos(prevState => {
      return prevState.filter(todo => todo.id !== todoID);
    });
  };

  const hasTodo = todos.length > 0;

  const editTodo = todo => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };

  const updateTodo = updateText => {
    setTodos(prevTodos => {
      return prevTodos.map(todo =>
        todo.id === currentTodo.id ? { ...todo, text: updateText } : todo
      );
    });

    setIsEditing(false);
    setCurrentTodo({});
  };

  const cancelUpdate = () => {
    setIsEditing(false);
    setCurrentTodo({});
  };

  const findTodo = text => {
    return todos.some(todo => todo.text.toLowerCase() === text.toLowerCase());
  };

  return (
    <>
      {!isEditing && <Form onSubmit={addNewTodo} />}
      {isEditing && (
        <EditForm
          updateTodo={updateTodo}
          cancelUpdate={cancelUpdate}
          defaultValue={currentTodo.text}
        />
      )}

      {hasTodo && (
        <TodoList data={todos} onDelete={deleteTodo} onEdit={editTodo} />
      )}
      {!hasTodo && <Text textAlign="center">There are no any todos ...</Text>}
    </>
  );
};
export default Todos;
