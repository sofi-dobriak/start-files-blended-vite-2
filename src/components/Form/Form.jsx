import { FiSearch } from 'react-icons/fi';
import style from './Form.module.css';
import { useRef } from 'react';
import { nanoid } from 'nanoid';

const Form = ({ onSubmit }) => {
  const inputFef = useRef();

  const handleSubmit = e => {
    e.preventDefault();

    const inputValue = inputFef.current.value.trim();
    if (!inputValue) return;

    onSubmit({
      id: nanoid(),
      text: inputValue,
    });

    inputFef.current.value = '';
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
          ref={inputFef}
        />
      </form>
    </>
  );
};

export default Form;
