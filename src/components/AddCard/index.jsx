import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddCard = ({ onClick }) => {
  return (
    <div className='card card--add flex-center' onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} className='add-icon' />
    </div>
  );
};

export default AddCard;
