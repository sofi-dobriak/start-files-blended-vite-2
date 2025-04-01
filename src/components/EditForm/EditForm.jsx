import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import style from './EditForm.module.css';
import { useRef } from 'react';

const EditForm = ({ updateTodo, cancelUpdate, defaultValue }) => {
  const inputRef = useRef();

  const handleSubmitForm = e => {
    e.preventDefault();

    const inputValue = inputRef.current.value.trim();
    if (!inputValue) return;

    updateTodo(inputValue);

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmitForm} className={style.form}>
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
