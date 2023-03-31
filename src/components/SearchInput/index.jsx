import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';

const SearchInput = ({ onChange, ...rest }) => {
  return (
    <div className='search-field flex-center' {...rest}>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className='search-field__icon'
      />
      <input
        type='text'
        className='search-field__input'
        placeholder='Search'
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
