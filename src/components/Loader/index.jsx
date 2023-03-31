import ClipLoader from 'react-spinners/ClipLoader';

const styles = {
  display: 'block',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
};

const Loader = isLoading => {
  return (
    <div style={styles}>
      <ClipLoader loading={isLoading} color='lightblue' size={150} />
    </div>
  );
};

export default Loader;
