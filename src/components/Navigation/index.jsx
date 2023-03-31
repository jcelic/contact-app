import './style.scss';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className='navigation flex-center'>
      <NavLink to='/contacts/all'>All</NavLink>
      <NavLink to='/contacts/favorites'>Favorites</NavLink>
    </nav>
  );
};

export default Navigation;
