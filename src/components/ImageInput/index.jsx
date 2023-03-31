import './style.scss';

const ImageInput = ({ registration, labelText, onChange }) => {
  return (
    <div className='file-input'>
      <input type='file' id='file' {...registration} onChange={onChange} />
      <span className='flex'>
        <label htmlFor='file'>{labelText}</label>
      </span>
    </div>
  );
};

export default ImageInput;
