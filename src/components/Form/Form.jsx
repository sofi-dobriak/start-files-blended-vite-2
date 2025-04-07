import { FiSearch } from 'react-icons/fi';
import style from './Form.module.css';
import { useState } from 'react';
import { nanoid } from 'nanoid';

const Form = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!query.trim()) {
      return alert('Can not be emplty');
    }

    onSubmit({
      id: nanoid(),
      value: query,
    });

    setQuery('');
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
          value={query}
          onChange={handleChange}
        />
      </form>
    </>
  );
};

export default Form;
