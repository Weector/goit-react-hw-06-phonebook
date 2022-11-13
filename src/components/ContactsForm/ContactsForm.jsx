import { Formik } from 'formik';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';
import { validationSchemaForm } from './validation Schema';

import {
  StyledForm,
  StyledLabel,
  StyledError,
  StyledInput,
  StyledInputContainer,
} from './ContactsForm.styled';
import { useDispatch } from 'react-redux';
import { addContacts } from 'redux/contactsSlice';

const ContactsForm = ({ makeContactItem }) => {
  const initialValues = {
    name: '',
    number: '',
  };

  const fieldData = [
    {
      type: 'text',
      name: 'name',
      placeholder: 'John Snow',
      label: 'Name',
    },
    {
      type: 'tel',
      name: 'number',
      placeholder: '+38(098)123-45-67',
      label: 'Number',
    },
  ];

  const dispatch = useDispatch();

  const handleSubmitForm = (value, { resetForm }) => {
    // setSubmitting(true);
    makeContactItem(value);
    resetForm();
    // setSubmitting(false);
    dispatch(addContacts(value));
  };

  const generateId = nanoid();

  return (
    <Formik
      onSubmit={handleSubmitForm}
      initialValues={initialValues}
      validationSchema={validationSchemaForm}
    >
      {({ handleChange, handleBlur }) => (
        <StyledForm>
          {fieldData.map(({ type, name, placeholder, label }) => (
            <StyledInputContainer key={name}>
              <StyledLabel htmlFor={generateId}>{label}</StyledLabel>
              <StyledInput
                id={generateId}
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
              />

              <StyledError name={name} component={'div'} />
            </StyledInputContainer>
          ))}
          <Button type="submit" text="Add Contact" />
        </StyledForm>
      )}
    </Formik>
  );
};

export default ContactsForm;

ContactsForm.propTypes = {
  makeContactItem: PropTypes.func.isRequired,
};
