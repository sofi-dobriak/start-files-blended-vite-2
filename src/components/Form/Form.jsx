import { FiSearch } from 'react-icons/fi';
import style from './Form.module.css';
import { useRef } from 'react';
import { nanoid } from 'nanoid';

const Form = ({ onSubmit }) => {
  const inputRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();

    const inputValue = inputRef.current.value.trim();
    if (!inputValue) return;

    onSubmit({
      id: nanoid(),
      text: inputValue,
    });

    inputRef.current.value = '';
  };

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <button className={style.button} type="submit">
          <FiSearch size="16px" />
        </button>

        <input
          className={style.input}
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          ref={inputRef}
        />
      </form>
    </>
  );
};

export default Form;
