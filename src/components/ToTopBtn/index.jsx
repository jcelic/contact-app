import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const ToTopBtn = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {showTopBtn && (
        <FontAwesomeIcon
          icon={faAngleUp}
          className='toTop-btn'
          onClick={scrollToTop}
        />
      )}
    </>
  );
};

export default ToTopBtn;
