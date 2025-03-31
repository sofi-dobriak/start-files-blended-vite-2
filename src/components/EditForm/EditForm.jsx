import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import style from './EditForm.module.css';
import { useRef } from 'react';

const EditForm = ({ defaultValue, updateTodo, cancelUpdate }) => {
  const inputRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();

    const updateText = inputRef.current.value.trim();
    if (!updateText) return;

    updateTodo(updateText);
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <button className={style.submitButton} type="submit">
        <RiSaveLine color="green" size="16px" />
      </button>

      <button onClick={cancelUpdate} className={style.editButton} type="button">
        <MdOutlineCancel color="red" size="16px" />
      </button>

      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="text"
        required
        autoFocus
        defaultValue={defaultValue}
        ref={inputRef}
      />
    </form>
  );
};
export default EditForm;
