import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className='flex-center'>
      <FontAwesomeIcon
        icon={faCircleArrowLeft}
        className='back-btn'
        onClick={() => navigate('/')}
        style={{
          display:
            location.pathname === '/contacts/all' ||
            location.pathname === '/contacts/favorites'
              ? 'none'
              : 'block',
        }}
      />

      <h1>Contact App</h1>
    </header>
  );
};

export default Header;
