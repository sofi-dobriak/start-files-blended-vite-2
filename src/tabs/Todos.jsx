import { useEffect, useState } from 'react';
import Form from '../components/Form/Form';
import TodoList from '../components/TodoList/TodoList';
import Text from '../components/Text/Text';
import EditForm from '../components/EditForm/EditForm';

const Todos = () => {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem('todo-key')) ?? []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const addNewTodo = newTodo => {
    if (findTodo(newTodo)) {
      alert('This todo already exists!');
      return;
    }

    setTodos(prevTodos => {
      return [...prevTodos, newTodo];
    });
  };

  useEffect(() => {
    localStorage.setItem('todo-key', JSON.stringify(todos));
  }, [todos]);

  const deleteTodo = todoID => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== todoID);
    });
  };

  const handleEditTodos = todo => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };

  const canselUpdate = () => {
    setIsEditing(false);
    setCurrentTodo({});
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

  const findTodo = text => {
    return todos.some(todo => todo.text.toLowerCase() === text.toLowerCase());
  };

  const hasTodos = todos.length > 0;

  return (
    <>
      {isEditing && (
        <EditForm
          defaultValue={currentTodo.text}
          updateTodo={updateTodo}
          cancelUpdate={canselUpdate}
        />
      )}
      {!isEditing && <Form onSubmit={addNewTodo} />}

      {hasTodos && (
        <TodoList data={todos} onDelete={deleteTodo} onEdit={handleEditTodos} />
      )}
      {!hasTodos && <Text textAlign="center">There are no any todos ...</Text>}
    </>
  );
};
export default Todos;
