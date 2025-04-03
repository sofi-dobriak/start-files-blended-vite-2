import style from './Button.module.css';

const Button = ({ children, onClick, disabled }) => {
  return (
    <button onClick={onClick} className={style.button} disabled={disabled}>
      {children}
    </button>
  );
};
export default Button;
