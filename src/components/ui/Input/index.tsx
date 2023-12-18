import styles from './Input.module.scss';

type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
};

const Input = (props: Proptypes) => {
  const { label, name, type, placeholder } = props;
  return (
    <div className={styles.container__item}>
      {label && <label htmlFor={name}>{label}</label>}
      <input name={name} id={name} type={type} className={styles.container__item__input} placeholder={placeholder} />
    </div>
  );
};

export default Input;
