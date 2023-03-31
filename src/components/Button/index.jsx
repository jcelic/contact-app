import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';

const Button = ({ children, icon, ...rest }) => {
  return (
    <button {...rest}>
      {icon && <FontAwesomeIcon icon={icon} />}
      {children}
    </button>
  );
};

export default Button;
