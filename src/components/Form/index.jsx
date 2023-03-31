import './style.scss';
import { faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button';
import InputField from 'components/InputField';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ContactsContext from 'context/contacts.context';
import ImageInput from 'components/ImageInput';
import { addContact, updateContact } from 'http/contacts.http';
import { EMAIL_REGEX, NUMBER_REGEX } from 'constants/regex.constants';

const Form = ({ onClose, editContact }) => {
  const [image, setImage] = useState(null);
  const text = editContact?.image ? 'Change Image' : 'Add Image';
  const [labelText, setLabelText] = useState(text);
  const { setContacts, contacts, setIsLoading, setSingleContact } =
    useContext(ContactsContext);

  const schema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required('Name is required')
      .min(2, 'Min is 2 letters'),
    surname: yup
      .string()
      .trim()
      .required('Surname is required')
      .min(2, 'Min is 2 letters'),
    email: yup
      .string()
      .trim()
      .required('Email is required')
      .matches(EMAIL_REGEX, 'Enter a valid email address'),
    phone: yup
      .string()
      .trim()
      .required('Number is required')
      .matches(NUMBER_REGEX, 'Min is 8 numbers, start with +'),
  });

  let preloadedValues;

  if (editContact) {
    preloadedValues = {
      name: editContact.name,
      surname: editContact.surname,
      email: editContact.email,
      phone: editContact.phone,
      image: editContact.image,
    };
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: editContact && preloadedValues,
  });

  const handleImage = e => {
    // Convert image to base 64
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Change input label
    if (file.name.length > 20) {
      setLabelText(file.name.slice(0, 20).concat('...'));
    } else {
      setLabelText(file.name);
    }
  };

  // ADD NEW CONTACT
  const onSubmitAdd = async formData => {
    formData = { ...formData, image, isFavorite: false };

    onClose();
    setIsLoading(true);
    const newContact = await addContact(formData);
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    setIsLoading(false);
  };

  // EDIT CONTACT
  const onSubmitEdit = async formData => {
    formData = {
      id: editContact.id,
      ...formData,
      image: image || editContact.image,
      isFavorite: editContact.isFavorite,
    };

    setIsLoading(true);
    const updatedContact = await updateContact(editContact.id, formData);
    const updatedContacts = contacts.map(contact =>
      contact.id === editContact.id ? updatedContact : contact
    );

    setContacts(updatedContacts);
    setSingleContact(updatedContact);
    onClose();
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(editContact ? onSubmitEdit : onSubmitAdd)}
      autoComplete='off'
    >
      <ImageInput
        registration={{ ...register('image') }}
        labelText={labelText}
        onChange={handleImage}
      />

      <InputField
        type='text'
        icon={faUser}
        label='Name'
        placeholder='Name'
        registration={{ ...register('name') }}
        error={errors.name?.message}
        className={errors.name && 'error'}
      />

      <InputField
        type='text'
        icon={faUser}
        label='Surname'
        placeholder='Surname'
        registration={{ ...register('surname') }}
        error={errors.surname?.message}
        className={errors.surname && 'error'}
      />

      <InputField
        type='text'
        icon={faEnvelope}
        label='Email'
        placeholder='Email'
        registration={{ ...register('email') }}
        error={errors.email?.message}
        className={errors.email && 'error'}
      />

      <InputField
        type='text'
        icon={faPhone}
        label='Phone Number'
        placeholder='Phone Number'
        registration={{ ...register('phone') }}
        error={errors.phone?.message}
        className={errors.phone && 'error'}
      />

      <div className='form-btns'>
        <Button type='button' onClick={onClose} className='btn btn--secondary'>
          Cancel
        </Button>

        <Button type='submit' className='btn btn--secondary'>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Form;
