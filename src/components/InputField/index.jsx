import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InputField = ({
  registration,
  icon,
  label,
  error,
  className = '',
  ...rest
}) => {
  return (
    <div className='input-field'>
      {label && <label>{label}</label>}
      <div className={`input-field__input ${className}`}>
        {icon && <FontAwesomeIcon icon={icon} className='input-field__icon' />}
        <input {...registration} {...rest} />
      </div>
      {error && <p className='form-error'>{error}</p>}
    </div>
  );
};

export default InputField;
